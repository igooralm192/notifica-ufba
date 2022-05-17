import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  ICompareHashCryptography,
  IFindOneUserRepository,
  IGenerateTokenCryptography,
} from '@/data/contracts'

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IFindOneUserRepository,
    private readonly compareHashCryptography: ICompareHashCryptography,
    private readonly generateTokenCryptography: IGenerateTokenCryptography,
  ) {}

  async run({
    email,
    password,
  }: IAuthenticateUserUseCase.Input): Promise<
    Either<BaseError, IAuthenticateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ email })

    if (!user) {
      return left(new AuthenticateUserError.UserDoesNotExistError())
    }

    const passwordMatch = await this.compareHashCryptography.compare({
      payload: password,
      hashed: user.password,
    })

    if (!passwordMatch) {
      return left(new AuthenticateUserError.WrongPasswordError())
    }

    const token = await this.generateTokenCryptography.generate({
      payload: { id: user.id },
    })

    return right({ token, user })
  }
}
