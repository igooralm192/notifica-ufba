import { IUser } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IGetUserByIdUseCase {
  export type Input = {
    userId: string
  }

  export type Output = {
    user: IUser
  }
}

export type IGetUserByIdUseCase = UseCase<
  IGetUserByIdUseCase.Input,
  Either<BaseError, IGetUserByIdUseCase.Output>
>
