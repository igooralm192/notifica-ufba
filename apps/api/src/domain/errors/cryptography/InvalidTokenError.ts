import { DomainError } from '../DomainError'

export class InvalidTokenError extends DomainError {
  constructor() {
    super('InvalidTokenError', 'Token inválido.')
  }
}
