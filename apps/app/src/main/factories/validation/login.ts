import { IValidation } from '@/domain/ports/validation'
import { LoginJoiValidation } from '@/infra/validation/joi/login'

export const makeLoginValidation = (): IValidation => {
  return new LoginJoiValidation()
}
