import { UserEntity } from '@/domain/entities'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'

export class MockedUserRepository
  implements IFindUserByEmailRepository, ICreateUserRepository
{
  create(): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
  findByEmail(): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
}
