import { IGetCacheStorage, ISaveCacheStorage } from '@/domain/ports/gateways'
import { AsyncStorageCacheStorage } from '@/infra/storage/async-storage'

export const makeCacheStorage = (): IGetCacheStorage & ISaveCacheStorage => {
  return new AsyncStorageCacheStorage()
}
