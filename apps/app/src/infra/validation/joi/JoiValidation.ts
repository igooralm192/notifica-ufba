import { CommonError } from '@/domain/errors'
import { IValidation, IValidationOutput } from '@/validation/protocols'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  validate(input: Record<string, any>): IValidationOutput {
    const { error } = this.schema.validate(input, { abortEarly: false })

    if (!error) {
      return {
        errors: {},
      }
    }

    return {
      errors: error.details.reduce((allErrors, errorDetail) => {
        const path = errorDetail.path.join('.')

        const errorContext = errorDetail?.context?.key
          ? {
              key: errorDetail?.context?.key,
              value: errorDetail?.context?.value,
            }
          : undefined

        return {
          ...allErrors,
          [path]: new CommonError.ValidationError(
            errorDetail.message,
            errorContext,
          ),
        }
      }, {}),
    }
  }
}
