export namespace ISaveCacheStorage {
  export type Input = {
    key: string
    value: any
  }

  export type Output = void
}

export interface ISaveCacheStorage {
  save(input: ISaveCacheStorage.Input): Promise<ISaveCacheStorage.Output>
}

export namespace IGetCacheStorage {
  export type Input = {
    key: string
  }

  export type Output = string | null
}

export interface IGetCacheStorage {
  get(input: IGetCacheStorage.Input): Promise<IGetCacheStorage.Output>
}
