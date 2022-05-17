import { RegisterPresenter } from '@/application/presenters/register'
import { makeAlertManager } from '@/main/factories/managers'
import { makeAuthStore } from '@/main/factories/stores'
import {
  makeCreateStudentUseCase,
  makeAuthenticateUserUseCase,
} from '@/main/factories/usecases'

export const makeRegisterPresenter = () => {
  const authStore = makeAuthStore()
  const alertManager = makeAlertManager()
  const createStudentUseCase = makeCreateStudentUseCase()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new RegisterPresenter(
    authStore,
    alertManager,
    createStudentUseCase,
    authenticateUserUseCase,
  )
}
