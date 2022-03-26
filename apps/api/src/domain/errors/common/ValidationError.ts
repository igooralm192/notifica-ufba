import { DomainError } from '../DomainError'

export class ValidationError extends DomainError {
  constructor(public message: string, public context?: any) {
    super('ValidationError', message)
  }
}
