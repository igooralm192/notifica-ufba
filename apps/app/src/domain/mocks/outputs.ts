import { IUserDTO } from '@/domain/dtos'
import { ILoginOutput } from '@/domain/ports/outputs'

import faker from 'faker'

export const mockLoginOutput = (user?: IUserDTO): ILoginOutput => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: user?.id || faker.datatype.uuid(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      type: user?.type || 'STUDENT',
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}
