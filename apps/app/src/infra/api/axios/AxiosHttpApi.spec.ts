import { IHttpApiRequest } from '@/domain/ports/gateways'

import { mockAxiosHttpResponse } from '@/infra/mocks'

import axios from 'axios'
import faker from 'faker'
import { mocked } from 'jest-mock'

import { AxiosHttpApi } from './AxiosHttpApi'

jest.mock('axios')

const mockHttpRequest = (): IHttpApiRequest => {
  return {
    url: faker.internet.url(),
    method: 'post',
    body: {},
    headers: {},
  }
}

const makeSUT = () => {
  const httpRequest = mockHttpRequest()
  const httpApi = new AxiosHttpApi(faker.internet.url())

  return {
    SUT: httpApi,
    httpRequest,
  }
}

describe('AxiosHttpApi', () => {
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

  it('should return correct response body on success', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(200)
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockResolvedValueOnce(axiosHttpResponse)

    const httpResponse = await SUT.request(httpRequest)

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponse.body).toMatchObject(axiosHttpResponse.data)
  })

  it('should return error response body on failure', async () => {
    const axiosHttpResponse = mockAxiosHttpResponse(400, {
      message: faker.random.words(),
    })
    const { SUT, httpRequest } = makeSUT()

    axiosMocked.mockRejectedValueOnce({
      response: axiosHttpResponse,
    })

    const httpResponse = await SUT.request(httpRequest)

    expect(httpResponse.statusCode).toBe(axiosHttpResponse.status)
    expect(httpResponse.body).toBe(axiosHttpResponse.data)
  })
})
