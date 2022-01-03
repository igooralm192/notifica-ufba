import { Either, left, right } from '@notifica-ufba/utils'
import {
  HttpClient,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@/data/protocols'

import axios, { AxiosError } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: HttpRequest): Promise<Either<HttpErrorResponse, HttpResponse>> {
    try {
      const response = await axios({ url, method, data: body, headers })

      return right({
        statusCode: response.status,
        body: response.data,
      })
    } catch (err: any) {
      const axiosError = err as AxiosError

      return left({
        statusCode: axiosError?.response?.status,
        type: axiosError?.response?.data?.type,
        message: axiosError?.response?.data?.message,
        context: axiosError?.response?.data?.context,
      })
    }
  }
}
