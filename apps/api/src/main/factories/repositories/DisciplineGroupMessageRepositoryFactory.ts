import { IFindAllDisciplineGroupMessageRepository } from '@/data/contracts'
import { FirestoreDisciplineGroupMessageRepository } from '@/infra/database/firestore/repositories/discipline-group-message/FirestoreDisciplineGroupMessageRepository'

export type IDisciplineGroupMessageRepository =
  IFindAllDisciplineGroupMessageRepository

export const makeDisciplineGroupMessageRepository =
  (): IDisciplineGroupMessageRepository => {
    return new FirestoreDisciplineGroupMessageRepository()
  }
