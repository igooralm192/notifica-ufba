import { IGetCacheStorage, ISaveCacheStorage } from '@/domain/ports/gateways'

export class MockedCacheStorage implements IGetCacheStorage, ISaveCacheStorage {
  get(): Promise<IGetCacheStorage.Output> {
    throw new Error('Method not implemented.')
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
