import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IReadDisciplineGroupUseCase {
  export type Input = {
    id: {
      disciplineGroupId?: string
    }
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export type IReadDisciplineGroupUseCase = UseCase<
  IReadDisciplineGroupUseCase.Input,
  Either<BaseError, IReadDisciplineGroupUseCase.Output>
>
