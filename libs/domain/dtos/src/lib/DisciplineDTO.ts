import { IDisciplineGroupDTO } from './DisciplineGroupDTO'
import { ITeacherDTO } from './TeacherDTO'

export interface IDisciplineDTO {
  id: string
  name: string
  code: string
  course: string
  teachers?: ITeacherDTO[]
  groups?: IDisciplineGroupDTO[]
  createdAt: Date
  updatedAt: Date
}
