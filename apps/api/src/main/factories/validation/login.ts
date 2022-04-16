import { ValidatorBuilder } from '@/main/builders'
import { ValidationComposite } from '@/validation/composites'

export const makeLoginValidation = () => {
  return ValidationComposite.build({
    email: ValidatorBuilder.create().email().required().build(),
  })
}
