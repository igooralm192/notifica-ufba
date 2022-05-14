import { BaseError } from '@notifica-ufba/errors'

export class WrongPasswordError extends BaseError {
  constructor() {
    super('WrongPasswordError', 'Senha incorreta.')
  }
}
