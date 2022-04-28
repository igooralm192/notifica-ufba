export interface IHttpApiRequest {
  url: string
  method: 'post'
  body?: any
  headers?: Record<string, string>
}

export interface IHttpApiResponse {
  statusCode: number
  body?: any
  stack?: string
}

export interface IHttpApi {
  request(data: IHttpApiRequest): Promise<IHttpApiResponse>
}
