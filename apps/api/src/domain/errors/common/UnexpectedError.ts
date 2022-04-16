import { BaseError } from '@/shared/errors'

export class UnexpectedError extends BaseError {
  constructor(error: Error) {
    super(
      'UnexpectedError',
      'Erro interno no servidor.',
      undefined,
      error.stack,
    )
  }
}
