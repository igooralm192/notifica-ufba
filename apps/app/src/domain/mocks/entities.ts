import { UserEntity } from '@/domain/models'

import faker from 'faker'

// User

export const mockUser = (): UserEntity => {
  return new UserEntity(
    faker.datatype.number(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.datatype.datetime(),
    faker.datatype.datetime(),
  )
}
