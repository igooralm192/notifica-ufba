import { DomainError } from '../DomainError'

export class TransactionNotFoundError extends DomainError {
  constructor() {
    super('TransactionNotFoundError', 'Transação não encontrada.')
  }
}
