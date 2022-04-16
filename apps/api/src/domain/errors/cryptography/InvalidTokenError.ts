import { BaseError } from '@/shared/errors'

export class InvalidTokenError extends BaseError {
  constructor() {
    super('InvalidTokenError', 'Token inválido.')
  }
}
