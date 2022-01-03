import { Either } from '@notifica-ufba/utils'

export interface HttpRequest<T = any, U = any> {
  url: string
  method: 'post'
  body?: T
  headers?: U
}

export interface HttpClient<P = any, Q = any> {
  request(
    data: HttpRequest<P>,
  ): Promise<Either<HttpErrorResponse, HttpResponse<Q>>>
}

export interface HttpResponse<T = any> {
  statusCode: number
  body?: T
}

export interface HttpErrorResponse extends HttpResponse {
  type: string
  message: string
}

export interface HttpValidationErrorResponse extends HttpErrorResponse {
  context: {
    key: string
    value: any
  }
}
