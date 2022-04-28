import { ILoginUseCase, LoginUseCase } from '@/domain/usecases'
import { makeHttpApi } from '@/main/factories/api'

export const makeLoginUseCase = (): ILoginUseCase => {
  const httpApi = makeHttpApi()

  return new LoginUseCase(httpApi)
}
