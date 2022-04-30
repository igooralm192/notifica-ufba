import {
  IGetCacheStorage,
  IHttpApi,
  IHttpApiRequest,
  IHttpApiResponse,
  ISaveCacheStorage,
} from '@/domain/ports/gateways'

export class MockedHttpApi implements IHttpApi {
  request(_: IHttpApiRequest): Promise<IHttpApiResponse> {
    throw new Error('Method not implemented.')
  }
}

export class MockedCacheStorage implements IGetCacheStorage, ISaveCacheStorage {
  get(): Promise<IGetCacheStorage.Output> {
    throw new Error('Method not implemented.')
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
