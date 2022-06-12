import { IReadDisciplineGroupsUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, right } from '@notifica-ufba/utils'

import { IFindAllDisciplineGroupRepository } from '@/data/contracts'

export class ReadDisciplineGroupsUseCase
  implements IReadDisciplineGroupsUseCase
{
  constructor(
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
  ) {}

  async run({
    listInput: { filter, paginate },
  }: IReadDisciplineGroupsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupsUseCase.Output>
  > {
    const disciplineGroups =
      await this.findAllDisciplineGroupRepository.findAll({
        where: filter,
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
