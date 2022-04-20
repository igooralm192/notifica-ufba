import { CommonError } from '@/domain/errors'
import { IValidation } from '@/validation/protocols'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  validate(field: string, value: any): CommonError.ValidationError | null {
    const { error } = this.schema.extract(field).validate(value)

    if (!error) return null

    const errorMessage = error.details[0].message
    const fieldKey = error.details[0].context?.key
    const fieldValue = error.details[0].context?.value

    return new CommonError.ValidationError(errorMessage, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: fieldKey!,
      value: fieldValue,
    })
  }
}
