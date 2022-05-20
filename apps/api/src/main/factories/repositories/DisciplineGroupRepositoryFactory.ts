import {
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaDisciplineGroupRepository } from '@/infra/database/prisma/repositories/discipline-group'

type IDisciplineGroupRepository = IFindOneDisciplineGroupRepository &
  IPushStudentDisciplineGroupRepository

export const makeDisciplineGroupRepository = (): IDisciplineGroupRepository => {
  return new PrismaDisciplineGroupRepository()
}
