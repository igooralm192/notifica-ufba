export interface IHttpResponse<T = any> {
  statusCode: number
  body: T
}
