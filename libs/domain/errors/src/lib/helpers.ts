import { IError } from './protocols'

export abstract class BaseError extends Error implements IError {
  type: string
  message: string
  context?: { key: string; value: any }
  error?: any

  constructor({ type, message, context, error }: IError) {
    super(message)

    this.name = this.type = type
    this.message = message
    this.context = context
    this.error = error
  }
}
