import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'

import { AuthenticateUserUseCase } from '@/data/usecases/user'
import { makeHttpApi } from '@/main/factories/api'
import { makeCacheStorage } from '@/main/factories/storage'

export const makeAuthenticateUserUseCase = (): IAuthenticateUserUseCase => {
  const httpApi = makeHttpApi()
  const cacheStorage = makeCacheStorage()

  return new AuthenticateUserUseCase(httpApi, cacheStorage)
}
