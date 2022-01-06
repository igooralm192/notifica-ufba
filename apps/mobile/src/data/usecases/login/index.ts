import { IHttpClient } from '@/data/protocols'
import { LoginError } from '@notifica-ufba/domain/errors'
import {
  ILoginUseCase,
  LoginUseCase as UseCase,
} from '@notifica-ufba/domain/usecases'
import { Either, left } from '@notifica-ufba/utils'

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
      }
    }

    return response.body
  }
}
