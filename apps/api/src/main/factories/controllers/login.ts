import { LoginController } from '@/application/controllers/login'
import { makeLoginUseCase } from '@/main/factories/usecases/login'

export const makeLoginController = () => {
  const loginUseCase = makeLoginUseCase()

  return new LoginController(loginUseCase)
}
