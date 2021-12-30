import { ValidationControllerErrorResponse } from '../protocols'

export class ValidationError extends Error {
  constructor(
    public readonly message: string,
    public readonly context: ValidationControllerErrorResponse['context'],
  ) {
    super(message)
    this.name = 'ValidationError'
  }

  getControllerErrorResponse(): ValidationControllerErrorResponse {
    return {
      type: ValidationError.name,
      message: this.message,
      context: this.context,
    }
  }
}
