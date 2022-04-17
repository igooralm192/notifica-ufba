import {
  IHttpClient,
  IHttpRequest,
  IHttpResponse,
} from '@/domain/ports/gateways'

import axios, { AxiosError, AxiosInstance } from 'axios'

export class AxiosHttpClient implements IHttpClient {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      // TODO: Use from .env
      baseURL: 'http://192.168.15.5:3333/api',
    })
  }

  async request({
    url,
    method,
    body,
    headers,
  }: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.api({ url, method, data: body, headers })

      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (error: any) {
      const axiosError = error as AxiosError

      const statusCode = axiosError?.response?.status || 500
      const body = axiosError?.response?.data
      const stack = axiosError?.stack

      return { statusCode, body, stack }
    }
  }
}
