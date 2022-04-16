import { BaseError } from '@/shared/errors'

export class TransactionNotFoundError extends BaseError {
  constructor() {
    super('TransactionNotFoundError', 'Transação não encontrada.')
  }
}
