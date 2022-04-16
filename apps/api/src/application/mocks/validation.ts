import { BaseError } from '@notifica-ufba/errors'
import { IValidation } from '@/validation/protocols'

export class MockedValidation implements IValidation {
  validate(): BaseError {
    throw new Error('Method not implemented.')
  }
}
