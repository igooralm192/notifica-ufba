import { IStudentDTO } from '@notifica-ufba/domain/dtos'
import { CommonError, CreateStudentError } from '@notifica-ufba/domain/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ICreateStudentUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    matriculation: string
    course: string
  }

  export type Errors =
    | CreateStudentError.StudentAlreadyExistsError
    | CommonError.InternalServerError

  export type Output = {
    student: IStudentDTO
  }
}

export type ICreateStudentUseCase = UseCase<
  ICreateStudentUseCase.Input,
  Either<ICreateStudentUseCase.Errors, ICreateStudentUseCase.Output>
>
