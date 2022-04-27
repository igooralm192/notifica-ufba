import { ILoginUseCase, LoginUseCase } from '@/domain/usecases'
import { makeHttpClient } from '@/main/factories/http'

export const makeLoginUseCase = (): ILoginUseCase => {
  const httpClient = makeHttpClient()

  return new LoginUseCase(httpClient)
}
