import { StudentDoesNotExistError } from '@notifica-ufba/domain/errors'
import { IReadDisciplineGroupsUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  IFindAllDisciplineGroupRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'

export class ReadDisciplineGroupsUseCase
  implements IReadDisciplineGroupsUseCase
{
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
  ) {}

  async run({
    userId,
    listInput: { paginate },
  }: IReadDisciplineGroupsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupsUseCase.Output>
  > {
    const student = await this.findOneStudentRepository.findOne({ userId })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    const disciplineGroups =
      await this.findAllDisciplineGroupRepository.findAll({
        where: { studentIds: { has: student.id } },
        skip: paginate?.page,
        take: paginate?.limit,
        include: {
          discipline: true,
          teacher: { include: { user: true } },
        },
      })

    return right({
      results: disciplineGroups.results,
      total: disciplineGroups.total,
    })
  }
}
