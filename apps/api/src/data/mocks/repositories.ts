import { UserEntity } from '@notifica-ufba/domain/entities'
import { IFindUserByEmailRepository } from '@/data/protocols/database'

export class MockedUserRepository implements IFindUserByEmailRepository {
  findByEmail(): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
}
