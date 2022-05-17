import { IHttpApi } from '@/data/contracts'

import axios, { AxiosError, AxiosInstance } from 'axios'

export class AxiosHttpApi implements IHttpApi {
  private api: AxiosInstance

  constructor(apiUrl: string) {
    this.api = axios.create({ baseURL: apiUrl })
  }

  async request({
    url,
    method,
    body,
    headers,
  }: IHttpApi.Request): Promise<IHttpApi.Response> {
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
