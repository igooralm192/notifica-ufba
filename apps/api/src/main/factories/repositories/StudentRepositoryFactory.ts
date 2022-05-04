import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'
import { PrismaStudentRepository } from '@/infra/database/prisma/repositories'

type IStudentRepository = ICreateStudentRepository & IFindOneStudentRepository

export const makeStudentRepository = (): IStudentRepository => {
  return new PrismaStudentRepository()
}
