import { IError } from '@notifica-ufba/domain/errors'
import { Either } from '@notifica-ufba/utils'

export interface IHttpRequest<T = any, U = any> {
  url: string
  method: 'post'
  body?: T
  headers?: U
}

export interface IHttpClient<P = any, Q = any> {
  request(data: IHttpRequest<P>): Promise<IHttpResponse<Either<IError, Q>>>
}

export interface IHttpResponse<T = any> {
  statusCode: number
  body?: T
}
