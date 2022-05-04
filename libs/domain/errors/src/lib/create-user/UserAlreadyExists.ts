import { BaseError } from '@notifica-ufba/errors'

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('UserAlreadyExistsError', 'Usuário já existe.')
  }
}
