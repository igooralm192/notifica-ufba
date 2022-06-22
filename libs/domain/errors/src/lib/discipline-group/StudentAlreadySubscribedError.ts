import { BaseError } from '@notifica-ufba/errors'

export class StudentAlreadySubscribedError extends BaseError {
  constructor(studentId: string) {
    super('StudentAlreadySubscribedError', 'Estudante já inscrito.', {
      key: 'studentId',
      value: studentId,
    })
  }
}
