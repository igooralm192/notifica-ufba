import { IUserDTO } from '@/domain/dtos'

import faker from 'faker'

export const mockUserDTO = (): IUserDTO => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    type: 'STUDENT',
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}
