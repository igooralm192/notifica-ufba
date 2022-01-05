import { CommonError } from '@notifica-ufba/domain/errors'

export interface IValidation {
  validate<T = any>(input: T): Promise<CommonError.ValidationError | null>
}
