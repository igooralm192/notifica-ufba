import { BaseError } from '@notifica-ufba/domain/errors'

export namespace DatabaseError {
  export class ConnectionNotFoundError extends BaseError {
    constructor() {
      super({
        type: 'ConnectionNotFoundError',
        message: 'Conexão com banco de dados não foi encontrada.',
      })
    }
  }

  export class TransactionNotFoundError extends BaseError {
    constructor() {
      super({
        type: 'TransactionNotFoundError',
        message: 'Transação não encontrada.',
      })
    }
  }
}
