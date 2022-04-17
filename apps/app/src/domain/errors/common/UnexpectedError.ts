import { BaseError } from '@notifica-ufba/errors'

export class UnexpectedError extends BaseError {
  constructor(error: Error) {
    super(
      'UnexpectedError',
      'Ocorreu um erro inesperado, tente novamente.',
      undefined,
      error.stack,
    )
  }
}
