import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right, UseCase } from '@notifica-ufba/utils'

import { CommonError, CreateUserError } from '@/domain/errors'
import { IGenerateHashCryptography } from '@/domain/ports/gateways'
import { ICreateUserInput } from '@/domain/ports/inputs'
import { ICreateUserOutput } from '@/domain/ports/outputs'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'
import { IUserType } from '@/domain/entities'

export type ICreateUserErrors =
  | CreateUserError.UserAlreadyExistsError
  | CommonError.InternalServerError

export type ICreateUserUseCase = UseCase<
  ICreateUserInput,
  Either<ICreateUserErrors, ICreateUserOutput>
>

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly generateHashCryptography: IGenerateHashCryptography,
    private readonly createUserRepository: ICreateUserRepository,
  ) {}

  async run({
    name,
    email,
    password,
    type = IUserType.STUDENT,
  }: ICreateUserInput): Promise<Either<BaseError, ICreateUserOutput>> {
    const user = await this.findUserByEmailRepository.findByEmail(email)

    if (user) return left(new CreateUserError.UserAlreadyExistsError())

    const hashedPassword = await this.generateHashCryptography.generate({
      payload: password,
    })

    const createdUser = await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
    })

    return right({
      user: createdUser,
    })
  }
}
