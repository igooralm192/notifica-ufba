import { UserMapper } from '@/mappers'
import { api } from '@/services/api'

import { IGetMyUserEndpoint, ILoginEndpoint } from './types'

export const login = async ({
  email,
  password,
}: ILoginEndpoint.Request): Promise<ILoginEndpoint.Response> => {
  const response = await api.post('/auth/user', { email, password })

  const { token } = response.data

  return { token }
}

export const getMyUser = async (): Promise<IGetMyUserEndpoint.Response> => {
  const response = await api.get('/users/me')

  const { user } = response.data

  return { user: UserMapper.toEntity(user) }
}
