import { AuthorizeUserMiddleware } from '@/application/middlewares'
import { makeGetUserIdByTokenUseCase } from '@/main/factories/usecases'

export const makeAuthorizeUserMiddleware = () => {
  const getUserIdByTokenUseCase = makeGetUserIdByTokenUseCase()

  return new AuthorizeUserMiddleware(getUserIdByTokenUseCase)
}
