import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/domain/ports/repositories'
import { PrismaStudentRepository } from '@/infra/database/prisma/repositories'

type IStudentRepository = ICreateStudentRepository & IFindOneStudentRepository

export const makeStudentRepository = (): IStudentRepository => {
  return new PrismaStudentRepository()
}
