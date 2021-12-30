import { LoginErrors } from '@notifica-ufba/domain/errors'
import { LoginUseCase as UseCase } from '@notifica-ufba/domain/usecases'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  CompareHashCryptography,
  GenerateTokenCryptography,
} from '@/data/protocols/cryptography'
import { FindUserByEmailRepository } from '@/data/protocols/database'

export class LoginUseCase implements UseCase {
  constructor(
    private readonly userRepository: FindUserByEmailRepository,
    private readonly hashCryptography: CompareHashCryptography,
    private readonly tokenCryptography: GenerateTokenCryptography,
  ) {}

  async run({
    email,
    password,
  }: UseCase.Params): Promise<Either<UseCase.Errors, UseCase.Result>> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new LoginErrors.UserDoesNotExistError())
    }

    const passwordMatch = await this.hashCryptography.compare({
      payload: password,
      hashed: user.password,
    })

    if (!passwordMatch) {
      return left(new LoginErrors.WrongPasswordError())
    }

    const token = await this.tokenCryptography.generate({
      payload: { id: user.id },
    })

    return right({
      token,
      user,
    })
  }
}
