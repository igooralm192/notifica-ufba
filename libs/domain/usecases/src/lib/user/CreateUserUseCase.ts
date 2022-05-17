import { IUser } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ICreateUserUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    type?: 'STUDENT' | 'TEACHER'
  }

  export type Output = {
    user: IUser
  }
}

export type ICreateUserUseCase = UseCase<
  ICreateUserUseCase.Input,
  Either<BaseError, ICreateUserUseCase.Output>
>
