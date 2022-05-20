import { BaseError } from '@notifica-ufba/errors'

export class MissingParamsError extends BaseError {
  constructor() {
    super('MissingParamsError', 'Faltam parâmetros.')
  }
}
