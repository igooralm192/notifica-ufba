import { DomainError } from '@/domain/errors/common'

export class ExpiredTokenError extends DomainError {
  constructor() {
    super('ExpiredTokenError', 'Token expirado.')
  }
}
