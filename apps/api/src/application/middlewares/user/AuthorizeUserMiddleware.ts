import { IGetUserIdByTokenUseCase } from '@notifica-ufba/domain/usecases'
import { BaseMiddleware } from '@/application/helpers'
import { ExpiredTokenError } from '@/data/errors'

export class AuthorizeUserMiddleware extends BaseMiddleware {
  constructor(
    private readonly getUserIdByTokenUsecase: IGetUserIdByTokenUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseMiddleware.Request,
  ): Promise<BaseMiddleware.Response> {
    const token = this.parseAuthorizationToken(request.headers)

    

    const result = await this.getUserIdByTokenUsecase.run(request.body)

    if (result.isRight()) {
      const { userId } = result.value
      return this.ok({ userId })
    }

    switch (result.value.constructor) {
      case ExpiredTokenError:
        return this.badRequest(result.value)

      default:
        return this.fail(result.value)
    }
  }

  private parseAuthorizationToken(headers: Record<string, string | undefined>) {
    if (!headers.Authorization) return

    const [, token] = headers.Authorization.split(' ')

    return token
  }
}
