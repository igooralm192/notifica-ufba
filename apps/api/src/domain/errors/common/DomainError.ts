export class DomainError extends Error {
  constructor(public type: string, public message: string) {
    super(message)
  }
}
