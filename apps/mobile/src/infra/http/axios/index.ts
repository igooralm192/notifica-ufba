import { CommonError, IError } from '@notifica-ufba/domain/errors'
import { Either, left, right } from '@notifica-ufba/utils'
import { IHttpClient, IHttpRequest, IHttpResponse } from '@/data/protocols'

import axios, { AxiosError } from 'axios'

const httpResponse = (statusCode: number, body?: any): IHttpResponse => {
  return { statusCode, body }
}

export class AxiosHttpClient implements IHttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: IHttpRequest): Promise<IHttpResponse<Either<IError, any>>> {
    try {
      const response = await axios({ url, method, data: body, headers })

      return httpResponse(response.status, right(response.data))
    } catch (error: any) {
      const axiosError = error as AxiosError

      // TODO: Handle Network and No-Response cases

      const statusCode = axiosError?.response?.status
      const errorType = axiosError?.response?.data?.type
      const errorMessage = axiosError?.response?.data?.message
      const errorContext = axiosError?.response?.data?.context

      switch (axiosError?.response?.status) {
        case 400:
          return httpResponse(
            statusCode,
            left(new CommonError.ValidationError(errorMessage, errorContext)),
          )
        case 500:
          return httpResponse(
            statusCode,
            left(new CommonError.UnexpectedError(error)),
          )

        default:
          return httpResponse(
            statusCode,
            left({
              type: errorType,
              message: errorMessage,
              context: errorContext,
            }),
          )
      }
    }
  }
}
