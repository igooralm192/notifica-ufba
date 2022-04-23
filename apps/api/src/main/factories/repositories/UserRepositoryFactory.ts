import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@/domain/ports/repositories'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories'

type IUserRepository = ICreateUserRepository & IFindUserByEmailRepository

export const makeUserRepository = (): IUserRepository => {
  return new PrismaUserRepository()
}
