import { DomainError } from '@/domain/errors/common'

export class TransactionNotFoundError extends DomainError {
  constructor() {
    super('TransactionNotFoundError', 'Transação não encontrada.')
  }
}
