import { LoginJoiValidation } from '@/infra/validation/joi'

export const makeLoginValidation = () => {
  return new LoginJoiValidation()
}
