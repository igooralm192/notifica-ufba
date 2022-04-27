import { IHttpClient } from '@/domain/ports/gateways'
import { AxiosHttpClient } from '@/infra/http/axios'
import env from '@/main/config/env'

export const makeHttpClient = (): IHttpClient => {
  return new AxiosHttpClient(env.API_URL)
}
