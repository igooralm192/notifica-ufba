import { IHttpResponse } from '@/presentation/protocols'

export interface IController<T = any, U = any> {
  handle(request: T): Promise<IHttpResponse<U>>
}
