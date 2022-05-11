import { BaseError } from '@notifica-ufba/errors'

export class MissingTokenError extends BaseError {
  constructor() {
    super('MissingTokenError', 'Token não encontrado.')
  }
}
