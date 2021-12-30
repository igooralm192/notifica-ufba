import { LoginErrors } from '@notifica-ufba/domain/errors'
import { User } from '@notifica-ufba/domain/entities'
import { UseCase, Either } from '@notifica-ufba/utils'

export namespace LoginUseCase {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    token: string
    user: User
  }

  export type Errors =
    | LoginErrors.UserDoesNotExistError
    | LoginErrors.WrongPasswordError
}

export type LoginUseCase = UseCase<
  LoginUseCase.Params,
  Either<LoginUseCase.Errors, LoginUseCase.Result>
>
