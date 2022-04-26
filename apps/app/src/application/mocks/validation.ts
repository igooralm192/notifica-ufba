import { IValidation, IValidationOutput } from '@/validation/protocols'

export class MockedValidation implements IValidation {
  validate(): IValidationOutput {
    throw new Error('Method not implemented.')
  }
}
