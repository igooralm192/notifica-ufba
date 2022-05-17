import {
  CommonError,
  AuthenticateUserError,
} from '@notifica-ufba/domain/errors'
import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IHttpApi, ISetCacheStorage } from '@/data/contracts'
import { UserModel } from '@/data/models'

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly httpApi: IHttpApi,
    private readonly setCacheStorage: ISetCacheStorage,
  ) {}

  async run({
    email,
    password,
  }: IAuthenticateUserUseCase.Input): Promise<
    Either<BaseError, IAuthenticateUserUseCase.Output>
  > {
    const response = await this.httpApi.request({
      url: '/auth/user',
      method: 'post',
      body: { email, password },
    })

    switch (response.statusCode) {
      case 200:
        await this.setCacheStorage.set({
          key: 'TOKEN',
          value: response.body.token,
        })

        return right({
          token: response.body.token,
          user: UserModel.fromJSON(response.body.user).toEntity(),
        })
      case 400:
        return left(
          new CommonError.ValidationError(
            response.body.message,
            response.body.context,
          ),
        )
      case 404:
        return left(new AuthenticateUserError.UserDoesNotExistError())
      case 401:
        return left(new AuthenticateUserError.WrongPasswordError())
      case 500: {
        const error = new Error()
        error.stack = response.stack
        return left(new CommonError.InternalServerError(error))
      }
      default:
        return response.body
    }
  }
}
