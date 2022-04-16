import { UserEntity } from '@/domain/entities'

import faker from 'faker'

export const mockUser = (): UserEntity => {
  return new UserEntity(
    faker.datatype.number(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    faker.datatype.datetime(),
    faker.datatype.datetime(),
  )
}
