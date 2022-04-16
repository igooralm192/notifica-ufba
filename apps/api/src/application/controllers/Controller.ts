import { CommonError, DomainError } from '@/domain/errors'

export interface IControllerResponse {
  statusCode: number
  body: any
}

export abstract class Controller {
  abstract handle(request: any): Promise<IControllerResponse>

  public async perform(request: any): Promise<IControllerResponse> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err)
    }
  }

  private response(statusCode: number, body: any): IControllerResponse {
    return { statusCode, body }
  }

  private errorResponse(
    statusCode: number,
    error: DomainError,
  ): IControllerResponse {
    return this.response(statusCode, {
      message: error.message,
      ...error,
    })
  }

  public ok(data: any) {
    return this.response(200, data)
  }

  public badRequest(error: DomainError) {
    return this.errorResponse(400, error)
  }

  public unauthorized(error: DomainError) {
    return this.errorResponse(401, error)
  }

  public notFound(error: DomainError) {
    return this.errorResponse(404, error)
  }

  public fail(error: Error) {
    return this.errorResponse(500, new CommonError.UnexpectedError(error))
  }
}
