import { DomainError } from '../DomainError'

export class ValidationError extends DomainError {
  constructor(
    public message: string,
    public context?: { key: string; value: string },
  ) {
    super('ValidationError', message)
  }
}
