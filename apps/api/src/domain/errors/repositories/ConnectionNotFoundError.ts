import { BaseError } from '@/shared/errors'

export class ConnectionNotFoundError extends BaseError {
  constructor() {
    super(
      'ConnectionNotFoundError',
      'Conexão com banco de dados não foi encontrada.',
    )
  }
}
