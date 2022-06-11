import { IDisciplineGroup } from 'libs/domain/entities/src/lib/DisciplineGroup'
import { IUser } from './User'

export interface IDisciplineGroupPost {
  id: string
  title: string
  content: string

  author?: IUser
  authorId: string

  disciplineGroup?: IDisciplineGroup
  disciplineGroupId: string

  createdAt: Date
  updatedAt: Date
}
