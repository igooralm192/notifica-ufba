import { ValidationError } from '@/presentation/errors'
import { ControllerErrorResponse } from '.'

export interface ValidationControllerErrorResponse
  extends ControllerErrorResponse {
  context: {
    key: string
    value: any
  }
}
export interface Validation {
  validate<T = any>(input: T): Promise<ValidationError | null>
}
