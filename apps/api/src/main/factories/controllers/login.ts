import { LoginController } from '@/presentation/controllers/login'
import { makeLoginUseCase } from '@/main/factories/usecases/login'
import { makeLoginValidation } from '@/main/factories/validation'

export const makeLoginController = () => {
  const loginUseCase = makeLoginUseCase()
  const loginValidation = makeLoginValidation()

  return new LoginController(loginValidation, loginUseCase)
}
