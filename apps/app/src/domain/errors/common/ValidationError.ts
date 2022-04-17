import { BaseError } from '@notifica-ufba/errors'

export class ValidationError extends BaseError {
  constructor(message: string, context?: { key: string; value: string }) {
    super('ValidationError', message, context)
  }
}
