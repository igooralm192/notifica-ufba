import { DomainError } from '../DomainError'

export class ConnectionNotFoundError extends DomainError {
  constructor() {
    super(
      'ConnectionNotFoundError',
      'Conexão com banco de dados não foi encontrada.',
    )
  }
}
