import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right, UseCase } from '@notifica-ufba/utils'

import { CreateStudentError } from '@/domain/errors'
import { ICreateStudentInput } from '@/domain/ports/inputs'
import { ICreateStudentOutput } from '@/domain/ports/outputs'
import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/domain/ports/repositories'
import { ICreateUserErrors, ICreateUserUseCase } from '@/domain/usecases'

export type ICreateStudentErrors =
  | CreateStudentError.StudentAlreadyExistsError
  | ICreateUserErrors

export type ICreateStudentUseCase = UseCase<
  ICreateStudentInput,
  Either<ICreateStudentErrors, ICreateStudentOutput>
>

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly createStudentRepository: ICreateStudentRepository,
  ) {}

  async run({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentInput): Promise<Either<BaseError, ICreateStudentOutput>> {
    const student = await this.findOneStudentRepository.findOne({
      matriculation,
    })

    if (student) return left(new CreateStudentError.StudentAlreadyExistsError())

    const resultOrError = await this.createUserUseCase.run({
      name,
      email,
      password,
    })

    if (resultOrError.isLeft()) {
      return left(resultOrError.value)
    }

    const { user } = resultOrError.value

    const createdStudent = await this.createStudentRepository.create({
      matriculation,
      course,
      userId: user.id,
    })

    return right({
      student: {
        ...createdStudent,
        user,
      },
    })
  }
}
