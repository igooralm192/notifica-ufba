import { IDiscipline, IStudent, IUser } from '@notifica-ufba/domain/entities'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockDiscipline = (): IDiscipline => {
  return {
    id: new ObjectId().toString(),
    name: faker.name.title(),
    code: faker.random.word(),
    course: faker.name.jobTitle(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}

export const mockStudent = (user = mockUser()): IStudent => {
  return {
    id: new ObjectId().toString(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
    user: user,
    userId: user?.id || new ObjectId().toString(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}

export const mockUser = (): IUser => {
  return {
    id: new ObjectId().toString(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: 'STUDENT',
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}
