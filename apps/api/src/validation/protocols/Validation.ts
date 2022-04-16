import { CommonError } from '@/domain/errors'

export interface IValidation {
  validate(input: Record<string, any>): CommonError.ValidationError | null
}
