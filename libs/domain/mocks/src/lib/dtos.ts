import { IStudentDTO, IUserDTO } from '@notifica-ufba/domain/dtos'

import faker from 'faker'

export const mockStudentDTO = (user = mockUserDTO()): IStudentDTO => {
  return {
    id: faker.datatype.uuid(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
    userId: user.id,
    user,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}

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
