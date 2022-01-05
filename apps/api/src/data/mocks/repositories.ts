import { User } from '@notifica-ufba/domain/entities'
import { IFindUserByEmailRepository } from '@/data/protocols/database'

export class MockedUserRepository implements IFindUserByEmailRepository {
  findByEmail(): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
