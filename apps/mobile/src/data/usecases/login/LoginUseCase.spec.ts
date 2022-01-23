import { LoginError } from '@notifica-ufba/domain/errors'
import { left, right } from '@notifica-ufba/utils'

import {
  mockLoginHttpRequest,
  mockLoginHttpResponse,
  MockedHttpClient,
} from '@/data/mocks'

import { LoginUseCase } from '.'

import faker from 'faker'

const makeSUT = () => {
  const loginHttpRequest = mockLoginHttpRequest()
  const loginHttpResponse = mockLoginHttpResponse()

  const httpClient = new MockedHttpClient()
  const loginUseCase = new LoginUseCase(httpClient)

  const httpRequestSpy = jest.spyOn(httpClient, 'request')
  return {
    SUT: loginUseCase,
    loginHttpRequest,
    loginHttpResponse,
    httpRequestSpy,
  }
}

describe('LoginUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, loginHttpRequest, loginHttpResponse, httpRequestSpy } =
      makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 200,
      body: right(loginHttpResponse),
    })

    await SUT.run(loginHttpRequest)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: loginHttpRequest,
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, loginHttpRequest, loginHttpResponse, httpRequestSpy } =
      makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 200,
      body: right(loginHttpResponse),
    })

    const resultOrError = await SUT.run(loginHttpRequest)
    const result = resultOrError.right()

    expect(result).toMatchObject({
      token: loginHttpResponse.token,
      user: {
        id: loginHttpResponse.user.id,
        name: loginHttpResponse.user.name,
        email: loginHttpResponse.user.email,
        createdAt: new Date(loginHttpResponse.user.created_at),
        updatedAt: new Date(loginHttpResponse.user.updated_at),
      },
    })
  })

  it('should return UserDoesNotExist error on statusCode 404', async () => {
    const { SUT, loginHttpRequest, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 404,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginHttpRequest)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })

  it('should return WrongPasswordError error on statusCode 401', async () => {
    const { SUT, loginHttpRequest, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 401,
      body: left({
        type: faker.random.word(),
        message: faker.random.words(),
      }),
    })

    const resultOrError = await SUT.run(loginHttpRequest)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(LoginError.WrongPasswordError)
  })

  it('should return error on another statusCode', async () => {
    const httpErrorResponseBody = {
      type: faker.random.word(),
      message: faker.random.words(),
    }
    const { SUT, loginHttpRequest, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: faker.datatype.number({
        min: 401,
        max: 499,
      }),
      body: left(httpErrorResponseBody),
    })

    const resultOrError = await SUT.run(loginHttpRequest)
    const result = resultOrError.left()

    expect(result).toMatchObject(httpErrorResponseBody)
  })
})
