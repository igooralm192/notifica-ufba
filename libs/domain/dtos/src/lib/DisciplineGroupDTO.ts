import { IDisciplineDTO } from './DisciplineDTO'
import { IStudentDTO } from './StudentDTO'
import { ITeacherDTO } from './TeacherDTO'

export interface IDisciplineGroupDTO {
  id: string
  code: string
  semester: string
  description: string
  place: string
  menuUrl: string
  classTime: Date

  teacherId?: string
  disciplineId?: string
  studentIds?: string[]

  teacher?: ITeacherDTO
  discipline?: IDisciplineDTO
  students?: IStudentDTO[]

  createdAt: Date
  updatedAt: Date
}
