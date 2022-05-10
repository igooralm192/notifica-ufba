import { CommonError } from '@notifica-ufba/domain/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IGetUserIdByTokenUseCase {
  export type Input = {
    token: string
  }

  export type Errors = CommonError.InternalServerError

  export type Output = {
    userId: string
  }
}

export type IGetUserIdByTokenUseCase = UseCase<
  IGetUserIdByTokenUseCase.Input,
  Either<IGetUserIdByTokenUseCase.Errors, IGetUserIdByTokenUseCase.Output>
>
