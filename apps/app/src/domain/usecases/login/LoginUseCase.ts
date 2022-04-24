import { Either, left, right, UseCase } from '@notifica-ufba/utils'

import { CommonError, LoginError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { ILoginInput } from '@/domain/ports/inputs'
import { IHttpClient } from '@/domain/ports/gateways'
import { ILoginOutput } from '@/domain/ports/outputs'

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
  constructor(private readonly httpClient: IHttpClient) {}

  async run({
    email,
    password,
  }: ILoginInput): Promise<Either<ILoginErrors, ILoginOutput>> {
    const response = await this.httpClient.request({
      url: '/login',
      method: 'post',
      body: { email, password },
    })

    // TODO: Save token on storage

    switch (response.statusCode) {
      case 200:
        return right({
          token: response.body.token,
          user: UserModel.fromJSON(response.body.user).toDTO(),
        })
      case 400:
        return left(
          new CommonError.ValidationError(
            response.body.message,
            response.body.context,
          ),
        )
      case 404:
        return left(new LoginError.UserDoesNotExistError())
      case 401:
        return left(new LoginError.WrongPasswordError())
      case 500: {
        const error = new Error()
        error.stack = response.stack
        return left(new CommonError.UnexpectedError(error))
      }
      default:
        return response.body
    }
  }
}
