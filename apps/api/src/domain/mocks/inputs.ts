import { ICreateUserInput, ILoginInput } from '@/domain/ports/inputs'

import faker from 'faker'

export const mockLoginInput = (): ILoginInput => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const mockCreateUserInput = (): ICreateUserInput => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
  }
}
