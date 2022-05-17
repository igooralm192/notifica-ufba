export namespace IHttpApi {
  export type Request = {
    url: string
    method: 'get' | 'post'
    body?: any
    params?: Record<string, any>
    headers?: Record<string, string>
  }

  export type Response = {
    statusCode: number
    body?: any
    stack?: string
  }
}

export interface IHttpApi {
  request(request: IHttpApi.Request): Promise<IHttpApi.Response>
}
