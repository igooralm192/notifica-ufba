import { IError } from '@notifica-ufba/domain/errors'
import { IHttpResponse } from '@/presentation/protocols'

export interface IController<T = any, U = any> {
  handle(request: T): Promise<IHttpResponse<IError | U>>
}
