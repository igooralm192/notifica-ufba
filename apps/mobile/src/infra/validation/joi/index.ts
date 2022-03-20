import { CommonError } from '@notifica-ufba/domain/errors'
import { IValidation } from '@/presentation/protocols'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  async validate<T = any>(
    input: T,
  ): Promise<CommonError.ValidationError | null> {
    try {
      await this.schema.validateAsync(input)

      return null
    } catch (err) {
      const errorDetail = err.details?.[0]

      return new CommonError.ValidationError(errorDetail?.message, {
        key: errorDetail?.context.key,
        value: errorDetail?.context.value,
      })
    }
  }
}

export * from './login'
