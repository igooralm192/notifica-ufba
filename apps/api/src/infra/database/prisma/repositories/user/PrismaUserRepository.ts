import { ICreateUserRepository, IFindOneUserRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaUserRepository
  extends PrismaRepository
  implements ICreateUserRepository, IFindOneUserRepository
{
  async create(
    input: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output> {
    const user = await this.client.user.create({ data: input })

    return user
  }

  async findOne(
    input: IFindOneUserRepository.Input,
  ): Promise<IFindOneUserRepository.Output> {
    const user = await this.client.user.findFirst({
      where: input,
    })

    if (!user) return null

    return user
  }
}
