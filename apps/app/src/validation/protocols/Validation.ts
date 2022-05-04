import { CommonError } from '@notifica-ufba/domain/errors'

export interface IValidationOutput {
  errors: Record<string, CommonError.ValidationError | null>
}

export interface IValidation {
  validate(input: Record<string, any>): IValidationOutput
}
