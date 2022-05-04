import { CreateUserError } from '@notifica-ufba/domain/errors'
import { ICreateUserUseCase } from '@notifica-ufba/domain/usecases'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  ICreateUserRepository,
  IFindOneUserRepository,
  IGenerateHashCryptography,
} from '@/data/contracts'
import { UserModel } from '@/data/models'

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
    Either<ICreateUserUseCase.Errors, ICreateUserUseCase.Output>
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

    return right({ user: UserModel.fromEntity(createdUser).toDTO() })
  }
}
