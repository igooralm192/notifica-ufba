import { CreateUserUseCase } from '@/domain/usecases'
import { BcryptHashCryptography } from '@/infra/cryptography/bcrypt'
import { JwtTokenCryptography } from '@/infra/cryptography/jwt'
import { TypeORMUserRepository } from '@/infra/database/typeorm/repositories'

export const makeCreateUserUseCase = () => {
  const userRepository = new TypeORMUserRepository()
  const hashCryptography = new BcryptHashCryptography()
  const tokenCryptography = new JwtTokenCryptography()

  return new CreateUserUseCase(
    userRepository,
    hashCryptography,
    tokenCryptography,
    userRepository,
  )
}
