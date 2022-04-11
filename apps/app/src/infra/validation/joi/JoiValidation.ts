import { CommonError } from '@/domain/errors'
import { IValidation } from '@/domain/ports/validation'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  validate(field: string, value: any): CommonError.ValidationError | null {
    const validationError = this.schema.extract(field).validate(value).error

    if (!validationError) return null

    const errorMessage = validationError.details[0].message

    return new CommonError.ValidationError(errorMessage, {
      key: field,
      value: value,
    })
  }
}
