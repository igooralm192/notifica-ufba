import { IGetCacheStorage, ISetCacheStorage } from '@/data/contracts'
import { AsyncStorageCacheStorage } from '@/infra/storage/async-storage'

export const makeCacheStorage = (): IGetCacheStorage & ISetCacheStorage => {
  return new AsyncStorageCacheStorage()
}
