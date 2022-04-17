import { ILoginUseCase, LoginUseCase } from '@/domain/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeLoginUseCase = (): ILoginUseCase => {
  const axiosHttpClient = makeAxiosHttpClient()

  return new LoginUseCase(axiosHttpClient)
}
