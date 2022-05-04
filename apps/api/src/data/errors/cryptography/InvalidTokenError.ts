import { BaseError } from '@notifica-ufba/errors'

export class InvalidTokenError extends BaseError {
  constructor() {
    super('InvalidTokenError', 'Token inválido.')
  }
}
