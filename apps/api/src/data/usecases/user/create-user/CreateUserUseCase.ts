import { CreateUserError } from '@notifica-ufba/domain/errors'
import { ICreateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  ICreateUserRepository,
  IFindOneUserRepository,
  IGenerateHashCryptography,
} from '@/data/contracts'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IFindOneUserRepository,
    private readonly generateHashCryptography: IGenerateHashCryptography,
    private readonly createUserRepository: ICreateUserRepository,
  ) {}

  async run({
    name,
    email,
    password,
    type = 'STUDENT',
  }: ICreateUserUseCase.Input): Promise<
    Either<BaseError, ICreateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ email })

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

    return right({ user: createdUser })
  }
}
