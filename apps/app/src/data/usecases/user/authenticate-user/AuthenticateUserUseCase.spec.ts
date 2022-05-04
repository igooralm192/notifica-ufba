import {
  CommonError,
  AuthenticateUserError,
} from '@notifica-ufba/domain/errors'
import { left } from '@notifica-ufba/utils'

import { MockedHttpApi } from '@/data/mocks/api'
import { MockedCacheStorage } from '@/data/mocks/storage'
import { UserModel } from '@/data/models'

import faker from 'faker'

import { AuthenticateUserUseCase } from '.'
import { mockAuthenticateUserInput } from '@notifica-ufba/domain/mocks'

const mockAuthenticateUserHttpResponse = () => {
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
  const authenticateUserInput = mockAuthenticateUserInput()
  const authenticateUserHttpResponse = mockAuthenticateUserHttpResponse()

  const httpApi = new MockedHttpApi()
  const cacheStorage = new MockedCacheStorage()
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    httpApi,
    cacheStorage,
  )

  const httpRequestSpy = jest.spyOn(httpApi, 'request')
  httpRequestSpy.mockResolvedValue({
    statusCode: 200,
    body: authenticateUserHttpResponse,
  })

  const saveSpy = jest.spyOn(cacheStorage, 'save')
  saveSpy.mockImplementation()

  return {
    SUT: authenticateUserUseCase,
    httpRequestSpy,
    saveSpy,
    authenticateUserInput,
    authenticateUserHttpResponse,
  }
}

describe('AuthenticateUserUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, authenticateUserInput, httpRequestSpy } = makeSUT()

    await SUT.run(authenticateUserInput)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/auth/user',
      method: 'post',
      body: authenticateUserInput,
    })
  })

  it('should call save cache storage with correct params', async () => {
    const {
      SUT,
      authenticateUserInput,
      authenticateUserHttpResponse,
      saveSpy,
    } = makeSUT()

    await SUT.run(authenticateUserInput)

    expect(saveSpy).toHaveBeenCalledWith({
      key: 'TOKEN',
      value: authenticateUserHttpResponse.token,
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, authenticateUserInput, authenticateUserHttpResponse } =
      makeSUT()

    const resultOrError = await SUT.run(authenticateUserInput)
    const result = resultOrError.right()

    expect(result).toMatchObject({
      user: UserModel.fromJSON(authenticateUserHttpResponse.user).toDTO(),
    })
  })

  it('should return UserDoesNotExist error on statusCode 404', async () => {
    const { SUT, authenticateUserInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 404,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(authenticateUserInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(AuthenticateUserError.UserDoesNotExistError)
  })

  it('should return WrongPasswordError error on statusCode 401', async () => {
    const { SUT, authenticateUserInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 401,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(authenticateUserInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(AuthenticateUserError.WrongPasswordError)
  })

  it('should return InternalServerError error on another statusCode', async () => {
    const { SUT, authenticateUserInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 500,
    })

    const resultOrError = await SUT.run(authenticateUserInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CommonError.InternalServerError)
  })
})
