import { CommonError } from '@notifica-ufba/domain/errors'
import { BaseError } from '@notifica-ufba/errors'

export namespace BaseController {
  export type Request<
    Body = any,
    Query = any,
    Params = any,
    Context = { userId?: string },
  > = {
    body?: Body
    query?: Query
    params?: Params
    context?: Context
  }

  export type Response = {
    statusCode: number
    body: any
  }
}

export abstract class BaseController {
  abstract handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response>

  public async perform(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err as Error)
    }
  }

  private response(statusCode: number, body?: any): BaseController.Response {
    return { statusCode, body }
  }

  public errorResponse(
    statusCode: number,
    error: BaseError,
  ): BaseController.Response {
    return this.response(statusCode, {
      code: error.code,
      message: error.message,
      context: error.context,
      stack: error.stack,
    })
  }

  public ok(data: any) {
    return this.response(200, data)
  }

  public noContent() {
    return this.response(204)
  }

  public badRequest(error: BaseError) {
    return this.errorResponse(400, error)
  }

  public unauthorized(error: BaseError) {
    return this.errorResponse(401, error)
  }

  public forbidden(error: BaseError) {
    return this.errorResponse(403, error)
  }

  public notFound(error: BaseError) {
    return this.errorResponse(404, error)
  }

  public unprocessable(error: BaseError) {
    return this.errorResponse(422, error)
  }

  public fail(error: Error) {
    return this.errorResponse(500, new CommonError.InternalServerError(error))
  }
}
