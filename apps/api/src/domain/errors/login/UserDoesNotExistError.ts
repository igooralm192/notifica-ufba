import { DomainError } from '@/domain/errors/common'

export class UserDoesNotExistError extends DomainError {
  constructor() {
    super('UserDoesNotExistError', 'Usuário não encontrado.')
  }
}
