import { BaseError } from '@/shared/errors'

export interface IValidator {
  validate(field: string, value: any): BaseError | null
}
