export interface IError {
  type: string
  message: string
  context?: { key: string; value: any }
  error?: any
}
