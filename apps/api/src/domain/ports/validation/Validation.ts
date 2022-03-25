import { CommonError } from '@/domain/errors'

export interface IValidation<T = any> {
  validate(input: T): Promise<CommonError.ValidationError | null>
}
