import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IPostMessageUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
    message: string
  }

  export type Output = IDisciplineGroupMessage
}

export type IPostMessageUseCase = UseCase<
  IPostMessageUseCase.Input,
  Either<BaseError, IPostMessageUseCase.Output>
>
