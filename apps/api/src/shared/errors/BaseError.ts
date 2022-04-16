export class BaseError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly context?: { key: string; value: any },
    public readonly stack?: string,
  ) {
    super(message)
  }
}
