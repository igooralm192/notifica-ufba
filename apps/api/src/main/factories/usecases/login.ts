import { LoginUseCase } from '@/data/usecases/login'
import { BcryptHashCryptography } from '@/infra/cryptography/bcrypt'
import { JwtTokenCryptography } from '@/infra/cryptography/jwt'
import { TypeORMUserRepository } from '@/infra/database/typeorm/repositories'

export const makeLoginUseCase = () => {
  const userRepository = new TypeORMUserRepository()
  const hashCryptography = new BcryptHashCryptography()
  const tokenCryptography = new JwtTokenCryptography()

  return new LoginUseCase(userRepository, hashCryptography, tokenCryptography)
}
