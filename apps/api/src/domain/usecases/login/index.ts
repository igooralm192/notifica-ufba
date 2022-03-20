import {
  CommonErrors,
  LoginErrors,
  LoginError,
} from '@notifica-ufba/domain/errors'
import { UseCase, Either, left, right } from '@notifica-ufba/utils'

import {
  ICompareHashCryptography,
  IGenerateTokenCryptography,
} from '@/data/protocols/cryptography'
import { IFindUserByEmailRepository } from '@/data/protocols/database'

export namespace LoginUseCase {
  export type Request = {
    email: string
    password: string
  }

  export type Errors = LoginErrors | CommonErrors

  export type Response = {
    token: string
    user: {
      id: number
      name: string
      email: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type ILoginUseCase = UseCase<
  LoginUseCase.Request,
  Either<LoginUseCase.Errors, LoginUseCase.Response>
>

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IFindUserByEmailRepository,
    private readonly hashCryptography: ICompareHashCryptography,
    private readonly tokenCryptography: IGenerateTokenCryptography,
  ) {}

  async run({
    email,
    password,
  }: LoginUseCase.Request): Promise<
    Either<LoginUseCase.Errors, LoginUseCase.Response>
  > {
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
