import { IValidation } from '@/validation/protocols'

import { useCallback } from 'react'
import { FieldValues, ResolverError, ResolverResult } from 'react-hook-form'

export const useValidationResolver = <T extends FieldValues>(
  validation: IValidation,
) =>
  useCallback(
    data => {
      const { errors } = validation.validate(data as T)

      if (Object.keys(errors).length === 0) {
        return {
          values: data,
          errors: {},
        } as ResolverResult<T>
      }

      return {
        values: {},
        errors: Object.entries(errors).reduce((allErrors, [key, error]) => {
          return {
            ...allErrors,
            [key]: {
              type: 'validation',
              message: error?.message,
            },
          }
        }, {}),
      } as ResolverError
    },
    [validation],
  )
