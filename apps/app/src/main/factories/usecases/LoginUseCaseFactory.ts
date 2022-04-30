import { ILoginUseCase, LoginUseCase } from '@/domain/usecases'
import { makeHttpApi } from '@/main/factories/api'
import { makeCacheStorage } from '@/main/factories/storage'

export const makeLoginUseCase = (): ILoginUseCase => {
  const httpApi = makeHttpApi()
  const cacheStorage = makeCacheStorage()

  return new LoginUseCase(httpApi, cacheStorage)
}
