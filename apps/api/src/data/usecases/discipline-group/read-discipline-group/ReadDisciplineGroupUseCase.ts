import { DisciplineGroupDoesNotExistError } from '@notifica-ufba/domain/errors'
import { IReadDisciplineGroupUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IFindOneDisciplineGroupRepository } from '@/data/contracts'

export class ReadDisciplineGroupUseCase implements IReadDisciplineGroupUseCase {
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
  ) {}

  async run({
    id,
  }: IReadDisciplineGroupUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupUseCase.Output>
  > {
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: id.disciplineGroupId },
        include: { discipline: true, teacher: { include: { user: true } } },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    return right({ disciplineGroup })
  }
}
