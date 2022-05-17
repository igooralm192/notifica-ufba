import { IGetCacheStorage, ISetCacheStorage } from '@/data/contracts'

export class MockedCacheStorage implements IGetCacheStorage, ISetCacheStorage {
  get(): Promise<IGetCacheStorage.Output> {
    throw new Error('Method not implemented.')
  }

  set(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
