import { IStudent } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ICreateStudentUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    matriculation: string
    course: string
  }

  export type Output = {
    student: IStudent
  }
}

export type ICreateStudentUseCase = UseCase<
  ICreateStudentUseCase.Input,
  Either<BaseError, ICreateStudentUseCase.Output>
>
