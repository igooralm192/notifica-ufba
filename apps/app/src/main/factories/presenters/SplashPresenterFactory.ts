import { SplashPresenter } from '@/application/presenters/splash'
import { makeCacheStorage } from '@/main/factories/storage'
import { makeAuthStore } from '@/main/factories/stores'

export const makeSplashPresenter = () => {
  const authStore = makeAuthStore()
  const cacheStorage = makeCacheStorage()

  return new SplashPresenter(authStore, cacheStorage)
}
