import { left } from '@notifica-ufba/utils'

import { CommonError, LoginError } from '@/domain/errors'
import { MockedCacheStorage, MockedHttpApi } from '@/domain/mocks/gateways'
import { mockLoginInput } from '@/domain/mocks/inputs'
import { UserModel } from '@/domain/models'

import faker from 'faker'

import { LoginUseCase } from '.'

const mockLoginHttpResponse = () => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: faker.datatype.number(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      created_at: faker.datatype.datetime().toISOString(),
      updated_at: faker.datatype.datetime().toISOString(),
    },
  }
}

const makeSUT = () => {
  const loginInput = mockLoginInput()
  const loginHttpResponse = mockLoginHttpResponse()

  const httpApi = new MockedHttpApi()
  const cacheStorage = new MockedCacheStorage()
  const loginUseCase = new LoginUseCase(httpApi, cacheStorage)

  const httpRequestSpy = jest.spyOn(httpApi, 'request')
  httpRequestSpy.mockResolvedValue({
    statusCode: 200,
    body: loginHttpResponse,
  })

  const saveSpy = jest.spyOn(cacheStorage, 'save')
  saveSpy.mockImplementation()

  return {
    SUT: loginUseCase,
    httpRequestSpy,
    saveSpy,
    loginInput,
    loginHttpResponse,
  }
}

describe('LoginUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, loginInput, httpRequestSpy } = makeSUT()

    await SUT.run(loginInput)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: loginInput,
    })
  })

  it('should call save cache storage with correct params', async () => {
    const { SUT, loginInput, loginHttpResponse, saveSpy } = makeSUT()

    await SUT.run(loginInput)

    expect(saveSpy).toHaveBeenCalledWith({
      key: 'ANY_KEY',
      value: loginHttpResponse.token,
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, loginInput, loginHttpResponse } = makeSUT()

    const resultOrError = await SUT.run(loginInput)
    const result = resultOrError.right()

    expect(result).toMatchObject({
      user: UserModel.fromJSON(loginHttpResponse.user).toDTO(),
    })
  })

  it('should return UserDoesNotExist error on statusCode 404', async () => {
    const { SUT, loginInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 404,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })

  it('should return WrongPasswordError error on statusCode 401', async () => {
    const { SUT, loginInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 401,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.WrongPasswordError)
  })

  it('should return UnexpectedError error on another statusCode', async () => {
    const { SUT, loginInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 500,
    })

    const resultOrError = await SUT.run(loginInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CommonError.UnexpectedError)
  })
})
