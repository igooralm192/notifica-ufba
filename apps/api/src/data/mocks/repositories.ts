import { User } from '@notifica-ufba/domain/entities'
import { FindUserByEmailRepository } from '@/data/protocols/database'

export class FakeUserRepository implements FindUserByEmailRepository {
  findByEmail(): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
