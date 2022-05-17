import { LoginPresenter } from '@/application/presenters/login'
import { makeAlertManager } from '@/main/factories/managers'
import { makeAuthStore } from '@/main/factories/stores'
import { makeAuthenticateUserUseCase } from '@/main/factories/usecases'

export const makeLoginPresenter = () => {
  const authStore = makeAuthStore()
  const alertManager = makeAlertManager()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new LoginPresenter(authStore, alertManager, authenticateUserUseCase)
}
