import {
  FindUserByEmailRepository,
  IFindUserByEmailRepository,
} from '@/data/protocols/database'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { TypeORMRepository } from '@/infra/database/typeorm/helpers'

export class TypeORMUserRepository
  extends TypeORMRepository
  implements IFindUserByEmailRepository
{
  private repository = this.getRepository(TypeORMUserEntity)

  async findByEmail(
    email: FindUserByEmailRepository.Params,
  ): Promise<FindUserByEmailRepository.Result> {
    const user = await this.repository.findOne({ email })

    return user ?? null
  }
}
