import { LoginError } from '@notifica-ufba/domain/errors'
import { left, right } from '@notifica-ufba/utils'

import {
  ICompareHashCryptography,
  IGenerateTokenCryptography,
} from '@/data/protocols/cryptography'
import { IFindUserByEmailRepository } from '@/data/protocols/database'
import { ILoginUseCase, LoginUseCase as UseCase } from '@/domain/usecases'

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IFindUserByEmailRepository,
    private readonly hashCryptography: ICompareHashCryptography,
    private readonly tokenCryptography: IGenerateTokenCryptography,
  ) {}

  async run({ email, password }: UseCase.Params): Promise<UseCase.Result> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new LoginError.UserDoesNotExistError())
    }

    const passwordMatch = await this.hashCryptography.compare({
      payload: password,
      hashed: user.password,
    })

    if (!passwordMatch) {
      return left(new LoginError.WrongPasswordError())
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
