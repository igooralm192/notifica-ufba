import { UserEntity } from '@/domain/entities'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaUserRepository
  extends PrismaRepository
  implements ICreateUserRepository, IFindUserByEmailRepository
{
  async create(params: ICreateUserRepository.Input): Promise<UserEntity> {
    const user = await this.client.user.create({ data: params })

    return user
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.client.user.findFirst({
      where: { email },
    })

    return user
  }
}
