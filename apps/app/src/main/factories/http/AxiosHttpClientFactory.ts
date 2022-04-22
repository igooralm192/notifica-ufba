import { AxiosHttpClient } from '@/infra/http/axios'
import env from '@/main/config/env'

export const makeAxiosHttpClient = () => {
  return new AxiosHttpClient(env.API_URL)
}
