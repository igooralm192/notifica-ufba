import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaStudentRepository
  extends PrismaRepository
  implements ICreateStudentRepository, IFindOneStudentRepository
{
  async create({
    matriculation,
    course,
    userId,
  }: ICreateStudentRepository.Input): Promise<ICreateStudentRepository.Output> {
    const student = await this.client.student.create({
      data: {
        matriculation,
        course,
        userId,
      },
      include: { user: true },
    })

    return {
      ...student,
      user: student.user || undefined,
    }
  }

  async findOne(
    input: IFindOneStudentRepository.Input,
  ): Promise<IFindOneStudentRepository.Output> {
    const student = await this.client.student
      .findFirst({
        where: input,
        include: { user: true },
      })
      .catch(() => null)

    if (!student) return null

    return {
      ...student,
      user: student.user || undefined,
    }
  }
}
