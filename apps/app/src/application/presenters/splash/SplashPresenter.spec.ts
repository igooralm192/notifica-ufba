import { MockedCacheStorage } from '@/data/mocks/storage'
import { MockedAuthStore } from '@/application/mocks/stores'

import faker from 'faker'

import { SplashPresenter } from '.'

const makeSUT = () => {
  const token = faker.datatype.uuid()

  const authStore = new MockedAuthStore()
  const cacheStorage = new MockedCacheStorage()
  const presenter = new SplashPresenter(authStore, cacheStorage)

  const getStorageSpy = jest.spyOn(cacheStorage, 'get')
  getStorageSpy.mockResolvedValue(token)

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  return {
    SUT: presenter,
    getStorageSpy,
    setTokenSpy,
    token,
  }
}

describe('SplashPresenter', () => {
  it('should call get storage with correct params on splash', async () => {
    const { SUT, getStorageSpy } = makeSUT()

    await SUT.load()

    expect(getStorageSpy).toHaveBeenCalledWith({ key: 'TOKEN' })
  })

  it('should call set token with correct params on splash', async () => {
    const { SUT, setTokenSpy, token } = makeSUT()

    await SUT.load()

    expect(setTokenSpy).toHaveBeenCalledWith(token)
  })
})
