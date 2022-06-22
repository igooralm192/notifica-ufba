import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ISubscribeStudentToDisciplineGroupUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export type ISubscribeStudentToDisciplineGroupUseCase = UseCase<
  ISubscribeStudentToDisciplineGroupUseCase.Input,
  Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
>
