import { ISaveCacheStorage } from '@/domain/ports/gateways'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class AsyncStorageCacheStorage implements ISaveCacheStorage {
  async save({ key, value }: ISaveCacheStorage.Input): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
}
