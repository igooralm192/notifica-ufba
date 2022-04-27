import { IStudentDTO, IUserDTO } from '@/domain/dtos'

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

export const mockStudentDTO = (user?: IUserDTO): IStudentDTO => {
  return {
    id: faker.datatype.uuid(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
    user: user,
    userId: user?.id || faker.datatype.uuid(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}
