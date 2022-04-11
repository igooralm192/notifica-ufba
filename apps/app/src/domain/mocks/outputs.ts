import { UserEntity } from '@/domain/entities'
import { ILoginOutput } from '@/domain/ports/outputs'

import faker from 'faker'

// Login

export const mockLoginOutput = (user?: UserEntity): ILoginOutput => {
  return {
    user: {
      id: user?.id || faker.datatype.number(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}
