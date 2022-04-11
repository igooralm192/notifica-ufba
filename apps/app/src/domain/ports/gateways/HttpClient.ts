export interface IHttpRequest {
  url: string
  method: 'post'
  body?: any
  headers?: Record<string, string>
}

export interface IHttpClient {
  request(data: IHttpRequest): Promise<IHttpResponse>
}

export interface IHttpResponse {
  statusCode: number
  body?: any
}
