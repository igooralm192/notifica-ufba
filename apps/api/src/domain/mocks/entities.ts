import { UserEntity } from '@/domain/entities'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockUser = (): UserEntity => {
  return new UserEntity({
    id: new ObjectId().toString(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  })
}
