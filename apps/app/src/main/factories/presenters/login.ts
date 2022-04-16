import { LoginPresenter } from '@/application/presenters/login'
import { makeAuthStore } from '@/main/factories/stores'
import { makeLoginValidation } from '@/main/factories/validation'
import { makeLoginUseCase } from '@/main/factories/usecases'

export const makeLoginPresenter = () => {
  return new LoginPresenter(
    makeAuthStore(),
    makeLoginValidation(),
    makeLoginUseCase(),
  )
}
