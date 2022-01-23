import { LoginError } from '@notifica-ufba/domain/errors'
import {
  LoginUseCase as UseCase,
  ILoginUseCase,
} from '@notifica-ufba/domain/usecases'
import { Either, left, right } from '@notifica-ufba/utils'

import { IUserDTO } from '@/data/dtos'
import { IHttpClient } from '@/data/protocols'
import { UserMapper } from '@/data/mappers'

export type LoginHttpRequest = {
  email: string
  password: string
}

export type LoginHttpResponse = {
  token: string
  user: IUserDTO
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly httpClient: IHttpClient<
      LoginHttpRequest,
      LoginHttpResponse
    >,
  ) {}

  async run(
    params: UseCase.Params,
  ): Promise<Either<UseCase.Errors, UseCase.Result>> {
    const response = await this.httpClient.request({
      url: '/login',
      method: 'post',
      body: params,
    })

    if (response.body.isRight()) {
      const { token, user } = response.body.value
      return right({ token, user: UserMapper.toEntity(user) })
    }

    switch (response.statusCode) {
      case 404:
        return left(new LoginError.UserDoesNotExistError())
      case 401:
        return left(new LoginError.WrongPasswordError())
      default:
        return left(response.body.value)
    }
  }
}
