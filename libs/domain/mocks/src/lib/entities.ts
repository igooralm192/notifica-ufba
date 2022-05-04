import {
  IUserType,
  IStudentEntity,
  IUserEntity,
  StudentEntity,
  UserEntity,
} from '@notifica-ufba/domain/entities'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockUserEntity = (): IUserEntity => {
  return new UserEntity({
    id: new ObjectId().toString(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: 'STUDENT',
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  })
}

export const mockStudentEntity = (user?: IUserEntity): IStudentEntity => {
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
