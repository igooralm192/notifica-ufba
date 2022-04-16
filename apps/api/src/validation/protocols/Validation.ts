import { BaseError } from '@/shared/errors'

export interface IValidation {
  validate(input: Record<string, any>): BaseError | null
}
