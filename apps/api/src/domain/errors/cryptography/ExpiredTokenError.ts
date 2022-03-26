import { DomainError } from '../DomainError'

export class ExpiredTokenError extends DomainError {
  constructor() {
    super('ExpiredTokenError', 'Token expirado.')
  }
}
