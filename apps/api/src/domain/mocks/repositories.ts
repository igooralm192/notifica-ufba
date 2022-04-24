import { StudentEntity, UserEntity } from '@/domain/entities'
import {
  ICreateStudentRepository,
  ICreateUserRepository,
  IFindOneStudentRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'

export class MockedUserRepository
  implements IFindUserByEmailRepository, ICreateUserRepository
{
  create(): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
  findByEmail(): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }
}

export class MockedStudentRepository
  implements IFindOneStudentRepository, ICreateStudentRepository
{
  create(): Promise<StudentEntity> {
    throw new Error('Method not implemented.')
  }
  findOne(): Promise<StudentEntity | null> {
    throw new Error('Method not implemented.')
  }
}
