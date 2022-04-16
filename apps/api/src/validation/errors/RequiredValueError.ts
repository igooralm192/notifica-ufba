import { BaseError } from '@/shared/errors'

export class RequiredValueError extends BaseError {
  constructor(key: string, value: any) {
    super('RequiredValueError', 'Campo obrigatório.', {
      key,
      value,
    })
  }
}
