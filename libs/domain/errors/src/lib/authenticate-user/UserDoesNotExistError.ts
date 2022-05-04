import { BaseError } from '@notifica-ufba/errors'

export class UserDoesNotExistError extends BaseError {
  constructor() {
    super('UserDoesNotExistError', 'Usuário não encontrado.')
  }
}
