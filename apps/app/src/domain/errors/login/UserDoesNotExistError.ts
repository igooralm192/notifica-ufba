import { DomainError } from '../DomainError'

export class UserDoesNotExistError extends DomainError {
  constructor() {
    super('UserDoesNotExistError', 'Usuário não encontrado.')
  }
}
