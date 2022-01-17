import { BaseError, CommonError, IError } from '@notifica-ufba/domain/errors'
import { IController, IHttpResponse } from '@/presentation/protocols'

const httpResponse = (statusCode: number, body: any): IHttpResponse => {
  return { statusCode, body }
}

export abstract class BaseController<T = any, U = any>
  implements IController<T, U>
{
  abstract handle(request: T): Promise<IHttpResponse<IError | U>>

  public async perform(request: any): Promise<IHttpResponse<any>> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err)
    }
  }

  public static json<T = any>(statusCode: number, data: T): IHttpResponse<T> {
    return httpResponse(statusCode, data)
  }

  public ok<T = any>(data: T) {
    return BaseController.json(200, data)
  }

  public badRequest(error: BaseError) {
    return BaseController.json(400, error)
  }

  public unauthorized(error: BaseError) {
    return BaseController.json(401, error)
  }

  public notFound(error: BaseError) {
    return BaseController.json(404, error)
  }

  public fail(error?: Error) {
    console.log(error)
    return BaseController.json(500, new CommonError.UnexpectedError(error))
  }
}
