import { CommonError } from '@/domain/errors'

export interface IPresenterResponse<T = any> {
  statusCode: number
  body: T
}

export abstract class Presenter {
  ok(data: any): IPresenterResponse {
    return { statusCode: 200, body: data }
  }

  badRequest(error: CommonError.DomainError): IPresenterResponse {
    return { statusCode: 400, body: error }
  }

  unauthorized(error: CommonError.DomainError): IPresenterResponse {
    return { statusCode: 401, body: error }
  }

  notFound(error: CommonError.DomainError): IPresenterResponse {
    return { statusCode: 404, body: error }
  }

  fail(
    error: Error = new CommonError.DomainError(
      'UnexpectedError',
      'Erro interno no servidor.',
    ),
  ): IPresenterResponse {
    return { statusCode: 500, body: error }
  }
}
