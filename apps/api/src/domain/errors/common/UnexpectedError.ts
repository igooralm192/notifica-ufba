import { DomainError } from '../DomainError'

export class UnexpectedError extends DomainError {
  constructor(error: Error) {
    super('UnexpectedError', 'Erro interno no servidor.', error.stack)
  }
}
