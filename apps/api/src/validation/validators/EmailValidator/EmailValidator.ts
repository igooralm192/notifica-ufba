import { BaseError } from '@notifica-ufba/errors'
import { InvalidEmailError } from '@/validation/errors'
import { IValidator } from '@/validation/protocols'

export class EmailValidator implements IValidator {
  constructor(private readonly emailValidator: IValidator) {}

  validate(field: string, value: any): BaseError | null {
    const error = this.emailValidator.validate(field, value)
    if (error) return new InvalidEmailError(field, value)
    return null
  }
}
