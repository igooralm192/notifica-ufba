import { Either, left, right, UseCase } from '@notifica-ufba/utils'

import { CommonError, CreateStudentError } from '@/domain/errors'
import { StudentModel } from '@/domain/models'
import { ICreateStudentInput } from '@/domain/ports/inputs'
import { IHttpApi } from '@/domain/ports/gateways'
import { ICreateStudentOutput } from '@/domain/ports/outputs'

export type ICreateStudentErrors =
  | CreateStudentError.StudentAlreadyExistsError
  | CreateStudentError.UserAlreadyExistsError
  | CommonError.UnexpectedError

export type ICreateStudentUseCase = UseCase<
  ICreateStudentInput,
  Either<ICreateStudentErrors, ICreateStudentOutput>
>

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(private readonly httpApi: IHttpApi) {}

  async run({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentInput): Promise<
    Either<ICreateStudentErrors, ICreateStudentOutput>
  > {
    const response = await this.httpApi.request({
      url: '/students',
      method: 'post',
      body: { name, email, password, matriculation, course },
    })

    switch (response.statusCode) {
      case 200:
        return right({
          student: StudentModel.fromJSON(response.body.student).toDTO(),
        })
      case 400:
        return left(
          new CommonError.ValidationError(
            response.body.message,
            response.body.context,
          ),
        )
      case 403:
        if (response.body.code === 'UserAlreadyExistsError')
          return left(new CreateStudentError.UserAlreadyExistsError())
        else return left(new CreateStudentError.StudentAlreadyExistsError())
      case 500: {
        const error = new Error()
        error.stack = response.stack
        return left(new CommonError.UnexpectedError(error))
      }
      default:
        return response.body
    }
  }
}
