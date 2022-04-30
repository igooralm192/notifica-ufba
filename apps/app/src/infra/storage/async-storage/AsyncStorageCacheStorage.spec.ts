import AsyncStorage from '@react-native-async-storage/async-storage'

import { AsyncStorageCacheStorage } from './AsyncStorageCacheStorage'

describe('AsyncStorageCacheStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('Should receive key and value and save on storage', async () => {
    const key = 'any-key'
    const value = 'any-value'

    await AsyncStorage.setItem(key, value)

    const cacheStorage = new AsyncStorageCacheStorage()

    const item = await cacheStorage.get({ key })

    expect(item).toEqual(value)
  })

  it('Should receive key and value and save on storage', async () => {
    const key = 'any-key'
    const value = 'any-value'
    const cacheStorage = new AsyncStorageCacheStorage()

    await cacheStorage.save({ key, value })

    const item = await AsyncStorage.getItem(key)

    expect(item).toEqual(value)
  })
})
