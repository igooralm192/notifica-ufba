import { BaseError } from '@notifica-ufba/errors'

export class ConnectionNotFoundError extends BaseError {
  constructor() {
    super(
      'ConnectionNotFoundError',
      'Conexão com banco de dados não foi encontrada.',
    )
  }
}
