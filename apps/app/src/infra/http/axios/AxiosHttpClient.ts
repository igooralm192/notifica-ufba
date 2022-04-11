import {
  IHttpClient,
  IHttpRequest,
  IHttpResponse,
} from '@/domain/ports/gateways'

import axios, { AxiosError } from 'axios'

export class AxiosHttpClient implements IHttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await axios({ url, method, data: body, headers })

      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (error: any) {
      const axiosError = error as AxiosError

      const statusCode = axiosError?.response?.status || 500
      const body = axiosError?.response?.data

      return { statusCode, body }
    }
  }
}
