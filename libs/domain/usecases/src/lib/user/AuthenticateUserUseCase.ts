import { IUserDTO } from '@notifica-ufba/domain/dtos'
import {
  CommonError,
  AuthenticateUserError,
} from '@notifica-ufba/domain/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IAuthenticateUserUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Errors =
    | AuthenticateUserError.UserDoesNotExistError
    | AuthenticateUserError.WrongPasswordError
    | CommonError.InternalServerError

  export type Output = {
    token: string
    user: IUserDTO
  }
}

export type IAuthenticateUserUseCase = UseCase<
  IAuthenticateUserUseCase.Input,
  Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
>
