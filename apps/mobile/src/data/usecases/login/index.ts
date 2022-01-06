import { LoginError } from '@notifica-ufba/domain/errors'
import {
  LoginUseCase as UseCase,
  ILoginUseCase,
} from '@notifica-ufba/domain/usecases'
import { Either, left } from '@notifica-ufba/utils'

import { IHttpClient } from '@/data/protocols'

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly httpClient: IHttpClient<UseCase.Params, UseCase.Result>,
  ) {}

  async run(
    params: UseCase.Params,
  ): Promise<Either<UseCase.Errors, UseCase.Result>> {
    const response = await this.httpClient.request({
      url: '/login',
      method: 'post',
      body: params,
    })

    if (response.body.isLeft()) {
      switch (response.statusCode) {
        case 404:
          return left(new LoginError.UserDoesNotExistError())
        case 401:
          return left(new LoginError.WrongPasswordError())
      }
    }

    return response.body
  }
}
