import { IError } from './protocols'

export abstract class BaseError implements IError {
  type: string
  message: string
  context?: { key: string; value: any }
  error?: any

  constructor({ type, message, context, error }: IError) {
    this.type = type
    this.message = message
    this.context = context
    this.error = error
  }
}
