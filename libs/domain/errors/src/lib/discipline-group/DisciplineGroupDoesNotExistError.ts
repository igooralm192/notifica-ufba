import { BaseError } from '@notifica-ufba/errors'

export class DisciplineGroupDoesNotExistError extends BaseError {
  constructor() {
    super('DisciplineGroupDoesNotExistError', 'Turma não encontrada.')
  }
}
