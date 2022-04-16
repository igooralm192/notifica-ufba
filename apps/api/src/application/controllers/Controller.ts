import { CommonError } from '@/domain/errors'
import { BaseError } from '@/shared/errors'

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
    error: BaseError,
  ): IControllerResponse {
    return this.response(statusCode, {
      code: error.code,
      message: error.message,
      context: error.context,
    })
  }

  public ok(data: any) {
    return this.response(200, data)
  }

  public badRequest(error: BaseError) {
    return this.errorResponse(400, error)
  }

  public unauthorized(error: BaseError) {
    return this.errorResponse(401, error)
  }

  public notFound(error: BaseError) {
    return this.errorResponse(404, error)
  }

  public fail(error: Error) {
    return this.errorResponse(500, new CommonError.UnexpectedError(error))
  }
}
