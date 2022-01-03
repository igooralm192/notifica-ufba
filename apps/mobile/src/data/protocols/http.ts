export interface HttpRequest<T = any, U = any> {
  url: string
  method: 'post'
  body?: T
  headers?: U
}

export interface HttpClient<P = any, Q = any> {
  request(data: HttpRequest<P, any>): Promise<HttpResponse<Q>>
}

export interface HttpResponse<T = any> {
  statusCode: number
  body?: T
}
