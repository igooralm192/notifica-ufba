import { CommonError, LoginError } from '@/domain/errors'
import { UseCase, Either } from '@notifica-ufba/utils'

export namespace LoginUseCase {
  export interface Request {
    email: string
    password: string
  }

  export type Errors =
    | LoginError.UserDoesNotExistError
    | LoginError.WrongPasswordError
    | CommonError.DomainError

  export interface Response {
    token: string
    user: {
      id: number
      name: string
      email: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type ILoginUseCase = UseCase<
  LoginUseCase.Request,
  Either<LoginUseCase.Errors, LoginUseCase.Response>
>
