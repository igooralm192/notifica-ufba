import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IGetUserIdByTokenUseCase {
  export type Input = {
    token: string
  }

  export type Output = {
    userId: string
  }
}

export type IGetUserIdByTokenUseCase = UseCase<
  IGetUserIdByTokenUseCase.Input,
  Either<BaseError, IGetUserIdByTokenUseCase.Output>
>
