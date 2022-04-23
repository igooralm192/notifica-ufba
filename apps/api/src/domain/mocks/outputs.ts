import { UserEntity } from '@/domain/entities'
import { ILoginOutput } from '@/domain/ports/outputs'

import faker from 'faker'

export const mockLoginOutput = (user?: UserEntity): ILoginOutput => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: user?.id || faker.datatype.number(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      matriculation: user?.matriculation || faker.datatype.uuid(),
      course: user?.course || faker.company.companyName(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}
