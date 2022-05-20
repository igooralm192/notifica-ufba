import { BaseError } from '@notifica-ufba/errors'

export class StudentDoesNotExistError extends BaseError {
  constructor() {
    super('StudentDoesNotExistError', 'Estudante não encontrado.')
  }
}
