import { CommonError, CreateStudentError } from '@notifica-ufba/domain/errors'
import { ICreateStudentUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IHttpApi } from '@/data/contracts'
import { StudentModel } from '@/data/models'

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(private readonly httpApi: IHttpApi) {}

  async run({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentUseCase.Input): Promise<
    Either<BaseError, ICreateStudentUseCase.Output>
  > {
    const response = await this.httpApi.request({
      url: '/students',
      method: 'post',
      body: { name, email, password, matriculation, course },
    })

    switch (response.statusCode) {
      case 200:
        return right({
          student: StudentModel.fromJSON(response.body.student).toEntity(),
        })
      case 400:
        return left(
          new CommonError.ValidationError(
            response.body.message,
            response.body.context,
          ),
        )
      case 403:
        return left(new CreateStudentError.StudentAlreadyExistsError())
      case 500: {
        const error = new Error()
        error.stack = response.stack
        return left(new CommonError.InternalServerError(error))
      }
      default:
        return response.body
    }
  }
}
