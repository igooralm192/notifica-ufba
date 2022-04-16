import { BaseError } from '@/shared/errors'

export class WrongPasswordError extends BaseError {
  constructor() {
    super('WrongPasswordError', 'Senha incorreta.')
  }
}
