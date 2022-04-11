import { CommonError } from '@/domain/errors'
import { IValidation } from '@/domain/ports/validation'

export class MockedValidation implements IValidation {
  validate(): CommonError.ValidationError | null {
    throw new Error('Method not implemented.')
  }
}
