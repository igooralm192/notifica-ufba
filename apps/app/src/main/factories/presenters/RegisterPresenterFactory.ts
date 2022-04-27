import { RegisterPresenter } from '@/application/presenters/register'
import { makeAuthStore } from '@/main/factories/stores'
import {
  makeCreateStudentUseCase,
  makeLoginUseCase,
} from '@/main/factories/usecases'

export const makeRegisterPresenter = () => {
  const authStore = makeAuthStore()
  const createStudentUseCase = makeCreateStudentUseCase()
  const loginUseCase = makeLoginUseCase()

  return new RegisterPresenter(authStore, createStudentUseCase, loginUseCase)
}
