export class DomainError extends Error {
  constructor(public type: string, public message: string, stack?: string) {
    super(message)

    this.stack = stack
  }
}
