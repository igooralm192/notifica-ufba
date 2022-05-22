import { CommonError } from '@notifica-ufba/domain/errors'
import { BaseError } from '@notifica-ufba/errors'
import axios, { AxiosError } from 'axios'

export const api = axios.create({ baseURL: 'http://10.0.2.2:3333/api' })

api.interceptors.response.use(
  response => response,
  (err: AxiosError) => {
    // TODO: Handle network error
    if (!err?.response?.data?.code || !err?.response?.data?.message) {
      return Promise.reject(new CommonError.InternalServerError(err))
    }

    const error = new BaseError(
      err?.response?.data?.code,
      err?.response?.data?.message,
      undefined,
      err?.stack,
    )

    return Promise.reject(error)
  },
)
