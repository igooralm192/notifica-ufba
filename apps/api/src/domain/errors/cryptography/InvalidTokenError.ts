import { DomainError } from '@/domain/errors/common'

export class InvalidTokenError extends DomainError {
  constructor() {
    super('InvalidTokenError', 'Token inválido.')
  }
}
