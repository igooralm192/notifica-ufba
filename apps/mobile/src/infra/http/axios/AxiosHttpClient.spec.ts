import { mockHttpRequest } from '@/data/mocks/http'
import { AxiosHttpClient } from '@/infra/http/axios'
import { mockAxiosHttpResponse } from '@/infra/mocks'
import { CommonError } from '@notifica-ufba/domain/errors'

import axios from 'axios'
import faker from 'faker'
import { mocked } from 'jest-mock'

jest.mock('axios')

const makeSUT = () => {
  const httpRequest = mockHttpRequest()
  const httpClient = new AxiosHttpClient()

  return {
    SUT: httpClient,
    httpRequest,
  }
}

describe('AxiosHttpClient', () => {
  const axiosMocked = mocked(axios)

  it('should make axios call with correct params', async () => {
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockResolvedValueOnce(mockAxiosHttpResponse())

    await SUT.request(httpRequest)

    expect(axiosMocked).toHaveBeenCalledWith({
      url: httpRequest.url,
      method: httpRequest.method,
      data: httpRequest.body,
      headers: httpRequest.headers,
    })
  })

  it('should return correct response body on status 200', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(200)
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockResolvedValueOnce(axiosHttpResponse)

    const httpResponse = await SUT.request(httpRequest)
    const httpResponseBody = httpResponse.body.right()

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponseBody).toMatchObject(axiosHttpResponse.data)
  })

  it('should return ValidationError on status 400', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(400, {
      message: faker.random.words(),
      context: {},
    })
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockRejectedValueOnce({
      response: axiosHttpResponse,
    })

    const httpResponse = await SUT.request(httpRequest)
    const httpResponseBody = httpResponse.body.left()

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponseBody.type).toBe(CommonError.ValidationError.name)
    expect(httpResponseBody.message).toBe(axiosHttpResponse.data.message)
    expect(httpResponseBody.context).toMatchObject(
      axiosHttpResponse.data.context,
    )
  })

  it('should return UnexpectedError on status 500', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(500)
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockRejectedValueOnce({
      response: axiosHttpResponse,
    })

    const httpResponse = await SUT.request(httpRequest)
    const httpResponseBody = httpResponse.body.left()

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponseBody.type).toBe(CommonError.UnexpectedError.name)
  })

  it('should return error on another status', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(
      faker.datatype.number({
        min: 401,
        max: 499,
      }),
      {
        type: faker.random.word(),
        message: faker.random.words(),
        context: {},
      },
    )
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockRejectedValueOnce({
      response: axiosHttpResponse,
    })

    const httpResponse = await SUT.request(httpRequest)
    const httpResponseBody = httpResponse.body.left()

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponseBody.type).toBe(axiosHttpResponse.data.type)
    expect(httpResponseBody.message).toBe(axiosHttpResponse.data.message)
    expect(httpResponseBody.context).toMatchObject(
      axiosHttpResponse.data.context,
    )
  })
})
