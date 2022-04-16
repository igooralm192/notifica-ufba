import { BaseError } from '@notifica-ufba/errors'

export class TransactionNotFoundError extends BaseError {
  constructor() {
    super('TransactionNotFoundError', 'Transação não encontrada.')
  }
}
