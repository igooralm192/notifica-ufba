import { BaseError } from '@notifica-ufba/errors'

export class StudentAlreadyExistsError extends BaseError {
  constructor() {
    super('StudentAlreadyExistsError', 'Estudante já existe.')
  }
}
