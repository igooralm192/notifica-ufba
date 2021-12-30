import { Validation } from '@/presentation/protocols'
import { ValidationError } from '@/presentation/errors'

export class FakeValidation implements Validation {
  async validate(): Promise<ValidationError> {
    throw new Error('Method not implemented.')
  }
}
