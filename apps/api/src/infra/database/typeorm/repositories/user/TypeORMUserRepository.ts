import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { TypeORMRepository } from '@/infra/database/typeorm/helpers'

export class TypeORMUserRepository
  extends TypeORMRepository
  implements ICreateUserRepository, IFindUserByEmailRepository
{
  private repository = this.getRepository(TypeORMUserEntity)

  async create(
    params: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output> {
    const user = this.repository.create(params)

    return await this.repository.save(user)
  }

  async findByEmail(
    email: IFindUserByEmailRepository.Input,
  ): Promise<IFindUserByEmailRepository.Output> {
    const user = await this.repository.findOneBy({ email })

    return user ?? null
  }
}
