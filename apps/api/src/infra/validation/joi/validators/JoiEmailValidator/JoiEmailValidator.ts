import { BaseError } from '@/shared/errors'
import { IValidator } from '@/validation/protocols'

import Joi from 'joi'

export class JoiEmailValidator implements IValidator {
  validate(field: string, value: any): BaseError {
    const error = Joi.string().email().validate(value).error

    if (error)
      return new BaseError('ValidatorError', error.message, {
        key: field,
        value,
      })

    return null
  }
}
