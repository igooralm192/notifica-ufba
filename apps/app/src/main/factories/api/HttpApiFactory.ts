import { IHttpApi } from '@/data/contracts'
import { AxiosHttpApi } from '@/infra/api/axios'
import env from '@/main/config/env'

export const makeHttpApi = (): IHttpApi => {
  return new AxiosHttpApi(env.API_URL)
}
