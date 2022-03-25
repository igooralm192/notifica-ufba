import { UserEntity } from '@/domain/entities'
import { IFindUserByEmailRepository } from '@/domain/ports/repositories'

export class MockedUserRepository implements IFindUserByEmailRepository {
  findByEmail(): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
}
