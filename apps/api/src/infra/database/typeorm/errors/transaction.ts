export class TransactionNotFoundError extends Error {
  constructor() {
    super('Transação não encontrada.')
    this.name = 'TransactionNotFoundError'
  }
}
