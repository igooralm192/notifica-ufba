import { LoginPresenter } from '@/application/presenters/login'
import { makeAuthStore } from '@/main/factories/stores'
import { makeLoginUseCase } from '@/main/factories/usecases'

export const makeLoginPresenter = () => {
  const authStore = makeAuthStore()
  const loginUseCase = makeLoginUseCase()

  return new LoginPresenter(authStore, loginUseCase)
}
