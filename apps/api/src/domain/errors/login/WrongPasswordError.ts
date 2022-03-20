import { DomainError } from '@/domain/errors/common'

export class WrongPasswordError extends DomainError {
  constructor() {
    super('WrongPasswordError', 'Senha incorreta.')
  }
}
