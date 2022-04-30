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
