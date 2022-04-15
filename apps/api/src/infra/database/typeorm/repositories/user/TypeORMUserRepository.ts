import { IFindUserByEmailRepository } from '@/domain/ports/repositories'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { TypeORMRepository } from '@/infra/database/typeorm/helpers'

export class TypeORMUserRepository
  extends TypeORMRepository
  implements IFindUserByEmailRepository
{
  private repository = this.getRepository(TypeORMUserEntity)

  async findByEmail(
    email: IFindUserByEmailRepository.Input,
  ): Promise<IFindUserByEmailRepository.Output> {
    const user = await this.repository.findOneBy({ email })

    return user ?? null
  }
}
