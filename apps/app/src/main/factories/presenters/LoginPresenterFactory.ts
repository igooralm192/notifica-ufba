import { LoginPresenter } from '@/application/presenters/login'
import { makeAuthStore } from '@/main/factories/stores'
import { makeLoginValidation } from '@/main/factories/validation'
import { makeLoginUseCase } from '@/main/factories/usecases'

export const makeLoginPresenter = () => {
  const authStore = makeAuthStore()
  const loginValidation = makeLoginValidation()
  const loginUseCase = makeLoginUseCase()

  return new LoginPresenter(authStore, loginValidation, loginUseCase)
}
