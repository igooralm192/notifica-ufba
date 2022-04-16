import { BaseError } from '@notifica-ufba/errors'

export interface IValidator {
  validate(field: string, value: any): BaseError | null
}
