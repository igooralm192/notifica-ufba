import { LoginError } from '@notifica-ufba/domain/errors'
import { left, right } from '@notifica-ufba/utils'

import {
  mockLoginParams,
  mockLoginResult,
  MockedHttpClient,
} from '@/data/mocks'
import { LoginUseCase } from '@/data/usecases/login'

import faker from 'faker'

const makeSUT = () => {
  const loginParams = mockLoginParams()
  const loginResult = mockLoginResult()

  const httpClient = new MockedHttpClient()
  const loginUseCase = new LoginUseCase(httpClient)

  const httpRequestSpy = jest.spyOn(httpClient, 'request')
  return {
    SUT: loginUseCase,
    loginParams,
    loginResult,
    httpRequestSpy,
  }
}

describe('LoginUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, loginParams, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: faker.datatype.number(),
      body: right({}),
    })

    await SUT.run(loginParams)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: loginParams,
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, loginParams, loginResult, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 200,
      body: right(loginResult),
    })

    const resultOrError = await SUT.run(loginParams)
    const result = resultOrError.right()

    expect(result).toMatchObject(loginResult)
  })

  it('should return UserDoesNotExist error on statusCode 404', async () => {
    const { SUT, loginParams, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 404,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginParams)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })

  it('should return error on another statusCode', async () => {
    const { SUT, loginParams, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 404,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginParams)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })
})
