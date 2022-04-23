import { CreateUserUseCase } from '@/domain/usecases'
import {
  makeHashCryptography,
  makeTokenCryptography,
} from '@/main/factories/gateways'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeCreateUserUseCase = () => {
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()
  const tokenCryptography = makeTokenCryptography()

  return new CreateUserUseCase(
    userRepository,
    hashCryptography,
    tokenCryptography,
    userRepository,
  )
}
