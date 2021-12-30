import { HttpResponse } from '@/presentation/protocols'

export interface ControllerErrorResponse {
  type: string
  message: string
}
export interface Controller<T = any, U = any> {
  handle(request: T): Promise<HttpResponse<U>>
}
