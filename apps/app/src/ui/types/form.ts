import { BaseError } from '@notifica-ufba/errors'
import { Either } from '@notifica-ufba/utils'

export interface IFormPresenter<T> {
  loading: boolean
  values: {
    [K in keyof T]: T[K]
  }
  errors: {
    [K in keyof T]?: string
  }
  validate(key: keyof T, value: any): void
  submit(values: T): Promise<Either<BaseError, any>>
}
