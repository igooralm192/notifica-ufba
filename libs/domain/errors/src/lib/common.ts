import { BaseError } from './helpers'

export namespace CommonError {
  export class ValidationError extends BaseError {
    constructor(message: string, context?: BaseError['context']) {
      super({
        type: 'ValidationError',
        message,
        context,
      })
    }
  }

  export class UnexpectedError extends BaseError {
    constructor(error?: any) {
      super({
        type: 'UnexpectedError',
        message: 'Um erro inesperado foi encontrado.',
        error,
      })
    }
  }
}

export type CommonErrors =
  | CommonError.ValidationError
  | CommonError.UnexpectedError
