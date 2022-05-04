import { BaseError } from '@notifica-ufba/errors'

export class InternalServerError extends BaseError {
  constructor(error: Error) {
    super(
      'InternalServerError',
      'Erro interno no servidor.',
      undefined,
      error.stack,
    )
  }
}
