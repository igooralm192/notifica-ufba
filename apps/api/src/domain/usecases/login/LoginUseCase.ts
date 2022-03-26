import { Either, left, right, UseCase } from '@notifica-ufba/utils'

import { CommonError, LoginError } from '@/domain/errors'
import { ILoginInput } from '@/domain/ports/inputs'
import {
  ICompareHashCryptography,
  IGenerateTokenCryptography,
} from '@/domain/ports/gateways'
import { IFindUserByEmailRepository } from '@/domain/ports/repositories'
import { ILoginOutput } from '@/domain/ports/outputs'
import { IValidation } from '@/domain/ports/validation'

export type ILoginErrors =
  | LoginError.UserDoesNotExistError
  | LoginError.WrongPasswordError
  | CommonError.ValidationError
  | CommonError.UnexpectedError

export type ILoginUseCase = UseCase<
  ILoginInput,
  Either<ILoginErrors, ILoginOutput>
>

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly validation: IValidation,
    private readonly userRepository: IFindUserByEmailRepository,
    private readonly hashCryptography: ICompareHashCryptography,
    private readonly tokenCryptography: IGenerateTokenCryptography,
  ) {}

  async run({
    email,
    password,
  }: ILoginInput): Promise<Either<ILoginErrors, ILoginOutput>> {
    const validationError = await this.validation.validate({ email, password })

    if (validationError) {
      return left(validationError)
    }

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

    delete user.password

    return right({
      token,
      user,
    })
  }
}
