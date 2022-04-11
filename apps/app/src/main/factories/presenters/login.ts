import { LoginPresenter } from '@/application/presenters/login'
import { makeLoginUseCase } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validation'

export const makeLoginPresenter = () => {
  return new LoginPresenter(makeLoginValidation(), makeLoginUseCase())
}
