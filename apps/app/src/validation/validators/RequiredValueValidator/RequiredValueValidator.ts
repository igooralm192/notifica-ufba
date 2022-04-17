import { BaseError } from '@notifica-ufba/errors'
import { RequiredValueError } from '@/validation/errors'
import { IValidator } from '@/validation/protocols'

export class RequiredValueValidator implements IValidator {
  validate(field: string, value: any): BaseError | null {
    if (!value) return new RequiredValueError(field, value)
    return null
  }
}
