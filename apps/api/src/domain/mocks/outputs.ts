import { StudentEntity, UserEntity } from '@/domain/entities'
import {
  ICreateStudentOutput,
  ICreateUserOutput,
  ILoginOutput,
} from '@/domain/ports/outputs'

import faker from 'faker'

export const mockLoginOutput = (user?: UserEntity): ILoginOutput => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: user?.id || faker.datatype.uuid(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}

export const mockCreateUserOutput = (user?: UserEntity): ICreateUserOutput => {
  return {
    user: {
      id: user?.id || faker.datatype.uuid(),
      name: user?.name || faker.internet.userName(),
      email: user?.email || faker.internet.email(),
      createdAt: user?.createdAt || faker.datatype.datetime(),
      updatedAt: user?.updatedAt || faker.datatype.datetime(),
    },
  }
}

export const mockCreateStudentOutput = (
  student?: StudentEntity,
): ICreateStudentOutput => {
  return {
    student: {
      id: student?.id || faker.datatype.uuid(),
      matriculation: student?.matriculation || faker.datatype.uuid(),
      course: student?.course || faker.company.companyName(),
      userId: student?.userId || faker.datatype.uuid(),
      user: student?.user,
      createdAt: student?.createdAt || faker.datatype.datetime(),
      updatedAt: student?.updatedAt || faker.datatype.datetime(),
    },
  }
}
