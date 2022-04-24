import { IUserType, UserEntity } from '@/domain/entities'
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'
import { PrismaRepository } from '@/infra/database/prisma/helpers'
import { User } from '@prisma/client'

export class PrismaUserRepository
  extends PrismaRepository
  implements ICreateUserRepository, IFindUserByEmailRepository
{
  async create(params: ICreateUserRepository.Input): Promise<UserEntity> {
    const user = await this.client.user.create({ data: params })

    return this.parseUser(user)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.client.user.findFirst({
      where: { email },
    })

    if (!user) return null

    return this.parseUser(user)
  }

  private parseUser(user: User): UserEntity {
    return {
      ...user,
      type: IUserType[user.type],
    }
  }
}
