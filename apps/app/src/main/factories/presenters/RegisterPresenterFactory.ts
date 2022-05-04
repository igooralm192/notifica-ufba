import { RegisterPresenter } from '@/application/presenters/register'
import { makeAuthStore } from '@/main/factories/stores'
import {
  makeCreateStudentUseCase,
  makeAuthenticateUserUseCase,
} from '@/main/factories/usecases'

export const makeRegisterPresenter = () => {
  const authStore = makeAuthStore()
  const createStudentUseCase = makeCreateStudentUseCase()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new RegisterPresenter(
    authStore,
    createStudentUseCase,
    authenticateUserUseCase,
  )
}
