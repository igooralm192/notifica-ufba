import { BaseError } from '@notifica-ufba/errors'

export class InvalidEmailError extends BaseError {
  constructor(key: string, value: any) {
    super('InvalidEmailError', 'E-mail inválido.', {
      key,
      value,
    })
  }
}
