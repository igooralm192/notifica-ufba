import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { UserMapper } from '@/mappers'
import { api } from '@/services/api'

export const login = async ({
  email,
  password,
}: IAuthenticateUserUseCase.Input): Promise<IAuthenticateUserUseCase.Output> => {
  const response = await api.post('/auth/user', { email, password })

  const { token, user } = response.data

  return {
    token,
    user: UserMapper.toEntity(user),
  }
}
