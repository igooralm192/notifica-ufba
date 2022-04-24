import { IUserType, StudentEntity, UserEntity } from '@/domain/entities'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockUser = (): UserEntity => {
  return new UserEntity({
    id: new ObjectId().toString(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: IUserType.STUDENT,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  })
}

export const mockStudent = (user?: UserEntity): StudentEntity => {
  return new StudentEntity({
    id: new ObjectId().toString(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
    user: user,
    userId: user?.id || new ObjectId().toString(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  })
}
