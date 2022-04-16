import { BaseError } from '@notifica-ufba/errors'

export class ExpiredTokenError extends BaseError {
  constructor() {
    super('ExpiredTokenError', 'Token expirado.')
  }
}
