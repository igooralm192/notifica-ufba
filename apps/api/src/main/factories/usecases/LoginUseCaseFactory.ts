import { LoginUseCase } from '@/domain/usecases'
import {
  makeHashCryptography,
  makeTokenCryptography,
} from '@/main/factories/gateways'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeLoginUseCase = () => {
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()
  const tokenCryptography = makeTokenCryptography()

  return new LoginUseCase(userRepository, hashCryptography, tokenCryptography)
}
