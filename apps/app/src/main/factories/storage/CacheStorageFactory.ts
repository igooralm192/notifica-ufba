import { IGetCacheStorage, ISaveCacheStorage } from '@/data/contracts'
import { AsyncStorageCacheStorage } from '@/infra/storage/async-storage'

export const makeCacheStorage = (): IGetCacheStorage & ISaveCacheStorage => {
  return new AsyncStorageCacheStorage()
}
