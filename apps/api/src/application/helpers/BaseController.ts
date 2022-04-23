import { BaseError } from '@notifica-ufba/errors'

import { CommonError } from '@/domain/errors'
import { IControllerResponseDTO } from '@/application/dtos'

export abstract class BaseController {
  abstract handle(request: any): Promise<IControllerResponseDTO>

  public async perform(request: any): Promise<IControllerResponseDTO> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err)
    }
  }

  private response(statusCode: number, body: any): IControllerResponseDTO {
    return { statusCode, body }
  }

  private errorResponse(
    statusCode: number,
    error: BaseError,
  ): IControllerResponseDTO {
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

  public fail(error: Error) {
    return this.errorResponse(500, new CommonError.InternalServerError(error))
  }
}
