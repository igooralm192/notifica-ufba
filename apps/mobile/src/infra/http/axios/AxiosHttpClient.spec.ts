import { mockHttpRequest } from '@/data/mocks/http'
import { AxiosHttpClient } from '@/infra/http/axios'
import { mockAxiosHttpResponse } from '@/infra/mocks'

import axios from 'axios'
import faker from 'faker'
import { mocked } from 'jest-mock'

jest.mock('axios')

const makeSUT = (httpResponseBody = {}) => {
  const httpRequest = mockHttpRequest()
  const axiosHttpResponse = mockAxiosHttpResponse(httpResponseBody)
  const httpClient = new AxiosHttpClient()

  return {
    SUT: httpClient,
    httpRequest,
    axiosHttpResponse,
  }
}

describe('AxiosHttpClient', () => {
  const axiosMocked = mocked(axios)

  it('should make axios call with correct params', async () => {
    const { SUT, httpRequest, axiosHttpResponse } = makeSUT()

    axiosMocked.mockResolvedValueOnce(axiosHttpResponse as any)

    await SUT.request(httpRequest)

    expect(axiosMocked).toHaveBeenCalledWith({
      url: httpRequest.url,
      method: httpRequest.method,
      data: httpRequest.body,
      headers: httpRequest.headers,
    })
  })

  it('should return correct response on success', async () => {
    const { SUT, httpRequest, axiosHttpResponse } = makeSUT()

    axiosMocked.mockResolvedValueOnce(axiosHttpResponse as any)

    const resultOrError = await SUT.request(httpRequest)
    const httpResponse = resultOrError.right()

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponse.body).toMatchObject(axiosHttpResponse.data)
  })

  it('should return error response on failure', async () => {
    const { SUT, httpRequest, axiosHttpResponse } = makeSUT({
      type: faker.random.word(),
      message: faker.random.words(),
    })

    axiosMocked.mockRejectedValueOnce({
      response: axiosHttpResponse,
    })

    const resultOrError = await SUT.request(httpRequest)
    const httpErrorResponse = resultOrError.left()

    expect(httpErrorResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpErrorResponse.type).toBe(axiosHttpResponse.data.type)
    expect(httpErrorResponse.message).toBe(axiosHttpResponse.data.message)
  })
})
