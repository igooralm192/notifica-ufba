import { CommonError } from '@notifica-ufba/domain/errors'
import { IValidation } from '@/presentation/protocols'

export class MockedValidation implements IValidation {
  async validate(): Promise<CommonError.ValidationError> {
    throw new Error('Method not implemented.')
  }
}
