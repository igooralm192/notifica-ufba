import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { CommonError, CreateUserError } from '@notifica-ufba/domain/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ICreateUserUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    type?: 'STUDENT' | 'TEACHER'
  }

  export type Errors =
    | CreateUserError.UserAlreadyExistsError
    | CommonError.InternalServerError

  export type Output = {
    user: IUserDTO
  }
}

export type ICreateUserUseCase = UseCase<
  ICreateUserUseCase.Input,
  Either<ICreateUserUseCase.Errors, ICreateUserUseCase.Output>
>
