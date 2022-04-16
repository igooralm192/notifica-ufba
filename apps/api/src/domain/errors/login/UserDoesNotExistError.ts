import { BaseError } from '@/shared/errors'

export class UserDoesNotExistError extends BaseError {
  constructor() {
    super('UserDoesNotExistError', 'Usuário não encontrado.')
  }
}
