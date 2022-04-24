import { StudentEntity } from '@/domain/entities'
import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/domain/ports/repositories'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaStudentRepository
  extends PrismaRepository
  implements ICreateStudentRepository, IFindOneStudentRepository
{
  async create({
    matriculation,
    course,
    userId,
  }: ICreateStudentRepository.Input): Promise<StudentEntity> {
    const student = await this.client.student.create({
      data: {
        matriculation,
        course,
        userId,
      },
    })

    return student
  }

  async findOne(
    input: IFindOneStudentRepository.Input,
  ): Promise<StudentEntity | null> {
    const student = await this.client.student.findFirst({ where: input })

    if (!student) return null

    return student
  }
}
