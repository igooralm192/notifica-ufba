import { InternalServerError, ValidationError } from '@/presentation/errors'
import {
  Controller,
  ControllerErrorResponse,
  HttpResponse,
  ValidationControllerErrorResponse,
} from '@/presentation/protocols'

const httpResponse = (statusCode: number, body: any): HttpResponse<any> => {
  return { statusCode, body }
}

const errorResponse = (error: Error): ControllerErrorResponse => {
  return { type: error.name, message: error.message }
}

export abstract class BaseController implements Controller {
  abstract handle(request: any): Promise<HttpResponse<any>>

  public async perform(request: any): Promise<HttpResponse<any>> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err)
    }
  }

  public static json<T = any>(statusCode: number, data: T): HttpResponse<T> {
    return httpResponse(statusCode, data)
  }

  public validationError(
    error: ValidationError,
  ): HttpResponse<ValidationControllerErrorResponse> {
    return BaseController.json(400, error.getControllerErrorResponse())
  }

  public unauthorized(error: Error): HttpResponse<ControllerErrorResponse> {
    return BaseController.json(401, errorResponse(error))
  }

  public notFound(error: Error): HttpResponse<ControllerErrorResponse> {
    return BaseController.json(404, errorResponse(error))
  }

  public ok<T = any>(data: T) {
    return BaseController.json(200, data)
  }

  public fail(error?: Error): HttpResponse<ControllerErrorResponse> {
    console.log(error)
    const internalError = new InternalServerError()
    return BaseController.json(500, errorResponse(internalError))
  }
}
