import { IDisciplineGroupDTO } from './DisciplineGroupDTO'
import { IUserDTO } from './UserDTO'

export interface IDisciplineGroupPostDTO {
  id: string
  title?: string
  content: string

  author?: IUserDTO
  authorId: string

  disciplineGroup?: IDisciplineGroupDTO
  disciplineGroupId: string

  createdAt: Date
  updatedAt: Date
}
