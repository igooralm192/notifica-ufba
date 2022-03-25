import { CommonError } from '@/domain/errors'
import { IValidation } from '@/domain/ports/validation'

export class MockedValidation implements IValidation {
  validate(): Promise<CommonError.ValidationError> {
    throw new Error('Method not implemented.')
  }
}
