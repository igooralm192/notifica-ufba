import { IUser } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IAuthenticateUserUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    token: string
    user: IUser
  }
}

export type IAuthenticateUserUseCase = UseCase<
  IAuthenticateUserUseCase.Input,
  Either<BaseError, IAuthenticateUserUseCase.Output>
>
