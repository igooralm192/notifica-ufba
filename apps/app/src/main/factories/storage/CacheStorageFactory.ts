import { ISaveCacheStorage } from '@/domain/ports/gateways'
import { AsyncStorageCacheStorage } from '@/infra/storage/async-storage'

export const makeCacheStorage = (): ISaveCacheStorage => {
  return new AsyncStorageCacheStorage()
}
