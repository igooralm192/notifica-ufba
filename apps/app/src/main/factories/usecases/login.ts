import { ILoginUseCase, LoginUseCase } from '@/domain/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeLoginUseCase = (): ILoginUseCase => {
  return new LoginUseCase(makeAxiosHttpClient())
}
