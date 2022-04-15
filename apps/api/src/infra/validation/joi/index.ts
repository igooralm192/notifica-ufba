import { CommonError } from '@/domain/errors'
import { IValidation } from '@/domain/ports/validation'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  async validate(input: any): Promise<CommonError.ValidationError | null> {
    try {
      await this.schema.validateAsync(input)

      return null
    } catch (err) {
      const errorDetail = err.details?.[0]

      console.log(errorDetail)

      return new CommonError.ValidationError(errorDetail?.message, {
        key: errorDetail?.context.key,
        value: errorDetail?.context.value,
      })
    }
  }
}

export * from './login'
