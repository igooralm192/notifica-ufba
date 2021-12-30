import { ValidationError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

import Joi from 'joi'

export class JoiValidation implements Validation {
  constructor(readonly schema: Joi.Schema) {}

  async validate<T = any>(input: T): Promise<ValidationError | null> {
    try {
      await this.schema.validateAsync(input)

      return null
    } catch (err) {
      const errorDetail = err.details?.[0]

      return new ValidationError(errorDetail?.message, {
        key: errorDetail?.context.key,
        value: errorDetail?.context.value,
      })
    }
  }
}

export * from './login'
