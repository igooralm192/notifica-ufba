import { BaseError } from '@/shared/errors'

export class ExpiredTokenError extends BaseError {
  constructor() {
    super('ExpiredTokenError', 'Token expirado.')
  }
}
