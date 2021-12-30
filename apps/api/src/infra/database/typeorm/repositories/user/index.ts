import { FindUserByEmailRepository } from '@/data/protocols/database'
import { UserTypeORM } from '@/infra/database/typeorm/entities'

import { TypeORMRepository } from '@/infra/database/typeorm/helpers'

export class UserTypeORMRepository
  extends TypeORMRepository
  implements FindUserByEmailRepository
{
  private repository = this.getRepository(UserTypeORM)

  async findByEmail(
    email: FindUserByEmailRepository.Params,
  ): Promise<FindUserByEmailRepository.Result> {
    const user = await this.repository.findOne({ email })

    return user ?? null
  }
}
