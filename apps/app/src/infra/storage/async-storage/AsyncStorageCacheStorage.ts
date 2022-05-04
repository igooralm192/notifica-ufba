import { IGetCacheStorage, ISaveCacheStorage } from '@/data/contracts'

import AsyncStorage from '@react-native-async-storage/async-storage'

export class AsyncStorageCacheStorage
  implements IGetCacheStorage, ISaveCacheStorage
{
  async get({ key }: IGetCacheStorage.Input): Promise<IGetCacheStorage.Output> {
    try {
      const value = await AsyncStorage.getItem(key)

      return value
    } catch (e) {
      return null
    }
  }

  async save({ key, value }: ISaveCacheStorage.Input): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
}
