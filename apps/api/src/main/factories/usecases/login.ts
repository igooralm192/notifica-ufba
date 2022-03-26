import { LoginUseCase } from '@/domain/usecases'
import { BcryptHashCryptography } from '@/infra/cryptography/bcrypt'
import { JwtTokenCryptography } from '@/infra/cryptography/jwt'
import { TypeORMUserRepository } from '@/infra/database/typeorm/repositories'
import { makeLoginValidation } from '@/main/factories/validation'

export const makeLoginUseCase = () => {
  const loginValidation = makeLoginValidation()
  const userRepository = new TypeORMUserRepository()
  const hashCryptography = new BcryptHashCryptography()
  const tokenCryptography = new JwtTokenCryptography()

  return new LoginUseCase(
    loginValidation,
    userRepository,
    hashCryptography,
    tokenCryptography,
  )
}
