import { CommonError } from '@/domain/errors'

export interface IValidation {
  validate(field: string, value: any): CommonError.ValidationError | null
}
