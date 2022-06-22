import { IUpdateUserUseCase } from '@notifica-ufba/domain/usecases'
import { UpdateUserUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeUpdateUserUseCase = (): IUpdateUserUseCase => {
  const userRepository = makeUserRepository()

  return new UpdateUserUseCase(userRepository, userRepository)
}
