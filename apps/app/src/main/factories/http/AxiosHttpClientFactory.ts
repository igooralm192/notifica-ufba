import { IHttpClient } from '@/domain/ports/gateways'
import { AxiosHttpClient } from '@/infra/http/axios'

export const makeAxiosHttpClient = (): IHttpClient => {
  return new AxiosHttpClient()
}
