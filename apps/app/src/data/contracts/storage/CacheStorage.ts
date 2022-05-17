export namespace IGetCacheStorage {
  export type Input = {
    key: string
  }

  export type Output = string | null
}

export interface IGetCacheStorage {
  get(input: IGetCacheStorage.Input): Promise<IGetCacheStorage.Output>
}

export namespace ISetCacheStorage {
  export type Input = {
    key: string
    value: any
  }

  export type Output = void
}

export interface ISetCacheStorage {
  set(input: ISetCacheStorage.Input): Promise<ISetCacheStorage.Output>
}
