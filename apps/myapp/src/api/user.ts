import {
  IAuthenticateUserUseCase,
  IGetUserByIdUseCase,
} from '@notifica-ufba/domain/usecases'
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

export const getMyUser = async (): Promise<IGetUserByIdUseCase.Output> => {
  const response = await api.get('/users/me')

  const { user } = response.data

  return { user: UserMapper.toEntity(user) }
}
