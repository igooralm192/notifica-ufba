import { AuthenticateUserController } from '@/application/controllers'
import { makeAuthenticateUserUseCase } from '@/main/factories/usecases'
import { makeAuthenticateUserValidation } from '@/main/factories/validation'

export const makeAuthenticateUserController = () => {
  const authenticateUserValidation = makeAuthenticateUserValidation()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new AuthenticateUserController(
    authenticateUserValidation,
    authenticateUserUseCase,
  )
}
