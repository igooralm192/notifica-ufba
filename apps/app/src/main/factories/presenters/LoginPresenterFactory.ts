import { LoginPresenter } from '@/application/presenters/login'
import { makeAuthStore } from '@/main/factories/stores'
import { makeAuthenticateUserUseCase } from '@/main/factories/usecases'

export const makeLoginPresenter = () => {
  const authStore = makeAuthStore()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new LoginPresenter(authStore, authenticateUserUseCase)
}
