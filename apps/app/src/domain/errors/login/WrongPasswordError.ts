import { DomainError } from '../DomainError'

export class WrongPasswordError extends DomainError {
  constructor() {
    super('WrongPasswordError', 'Senha incorreta.')
  }
}
