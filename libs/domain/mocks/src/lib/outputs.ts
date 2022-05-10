import { mockDisciplineDTO } from '@notifica-ufba/domain/mocks'
import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
  ICreateUserUseCase,
  IReadDisciplinesUseCase,
} from '@notifica-ufba/domain/usecases'

import faker from 'faker'

import { mockStudentDTO, mockUserDTO } from './dtos'

export const mockAuthenticateUserOutput = (
  user = mockUserDTO(),
): IAuthenticateUserUseCase.Output => {
  return { token: faker.datatype.uuid(), user }
}

export const mockCreateStudentOutput = (
  student = mockStudentDTO(),
): ICreateStudentUseCase.Output => {
  return { student }
}

export const mockCreateUserOutput = (
  user = mockUserDTO(),
): ICreateUserUseCase.Output => {
  return { user }
}

export const mockReadDisciplinesOutput = (
  discipline = mockDisciplineDTO(),
): IReadDisciplinesUseCase.Output => {
  return { disciplines: [discipline], total: 1 }
}
