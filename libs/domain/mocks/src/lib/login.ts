import { UserMocks } from '@notifica-ufba/domain/mocks'
import { LoginUseCase } from '@notifica-ufba/domain/usecases'
import { right } from '@notifica-ufba/utils'

import faker from 'faker'

export const mockLoginParams = (): LoginUseCase.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const mockLoginResult = (): LoginUseCase.Result => {
  return right({
    token: faker.datatype.uuid(),
    user: UserMocks.mockUser(),
  })
}
