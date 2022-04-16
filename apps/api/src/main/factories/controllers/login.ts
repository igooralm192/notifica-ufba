import { LoginController } from '@/application/controllers/login'
import { makeLoginUseCase } from '@/main/factories/usecases/login'
import { makeLoginValidation } from '@/main/factories/validation'

export const makeLoginController = () => {
  const loginValidation = makeLoginValidation()
  const loginUseCase = makeLoginUseCase()

  return new LoginController(loginValidation, loginUseCase)
}
