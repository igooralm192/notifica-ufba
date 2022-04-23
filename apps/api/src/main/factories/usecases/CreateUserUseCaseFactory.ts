import { CreateUserUseCase } from '@/domain/usecases'
import { makeHashCryptography } from '@/main/factories/gateways'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeCreateUserUseCase = () => {
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()

  return new CreateUserUseCase(userRepository, hashCryptography, userRepository)
}
