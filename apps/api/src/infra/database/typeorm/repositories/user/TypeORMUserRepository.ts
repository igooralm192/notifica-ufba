import {
  ICreateUserRepository,
  IFindOneUserRepository,
} from '@/data/contracts/'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { TypeORMRepository } from '@/infra/database/typeorm/helpers'

export class TypeORMUserRepository
  extends TypeORMRepository
  implements ICreateUserRepository, IFindOneUserRepository
{
  private repository = this.getRepository(TypeORMUserEntity)

  async create(
    input: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output> {
    const user = this.repository.create(input)

    return await this.repository.save(user)
  }

  async findOne(
    input: IFindOneUserRepository.Input,
  ): Promise<IFindOneUserRepository.Output> {
    const user = await this.repository.findOneBy(input)

    return user ?? null
  }
}
