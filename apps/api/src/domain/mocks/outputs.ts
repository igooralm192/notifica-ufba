import { UserEntity } from '@/domain/entities'
import { ICreateUserOutput, ILoginOutput } from '@/domain/ports/outputs'

import faker from 'faker'

export const mockLoginOutput = (user?: UserEntity): ILoginOutput => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: user?.id || faker.datatype.uuid(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}

export const mockCreateUserOutput = (user?: UserEntity): ICreateUserOutput => {
  return {
    user: {
      id: user?.id || faker.datatype.uuid(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}
