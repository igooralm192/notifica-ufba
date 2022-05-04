import { ICreateUserRepository, IFindOneUserRepository } from '@/data/contracts'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories'

type IUserRepository = ICreateUserRepository & IFindOneUserRepository

export const makeUserRepository = (): IUserRepository => {
  return new PrismaUserRepository()
}
