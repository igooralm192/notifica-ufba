import { BaseError } from '@notifica-ufba/domain/errors'

export namespace CryptographyError {
  export class InvalidTokenError extends BaseError {
    constructor() {
      super({ type: 'InvalidTokenError', message: 'Token inválido.' })
    }
  }

  export class ExpiredTokenError extends BaseError {
    constructor() {
      super({ type: 'ExpiredTokenError', message: 'Token expirado.' })
    }
  }
}
