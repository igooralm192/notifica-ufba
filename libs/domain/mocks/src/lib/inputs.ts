import { IUserType } from '@notifica-ufba/domain/entities'
import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
  ICreateUserUseCase,
} from '@notifica-ufba/domain/usecases'

import faker from 'faker'

export const mockAuthenticateUserInput = (): IAuthenticateUserUseCase.Input => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const mockCreateStudentInput = (): ICreateStudentUseCase.Input => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
  }
}

export const mockCreateUserInput = (): ICreateUserUseCase.Input => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: 'STUDENT',
  }
}
