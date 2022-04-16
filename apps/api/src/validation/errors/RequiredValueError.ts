import { BaseError } from '@notifica-ufba/errors'

export class RequiredValueError extends BaseError {
  constructor(key: string, value: any) {
    super('RequiredValueError', 'Campo obrigatório.', {
      key,
      value,
    })
  }
}
