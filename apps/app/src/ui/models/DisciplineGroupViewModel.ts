import { ITeacherViewModel } from './TeacherViewModel'

export interface IDisciplineGroupViewModel {
  id: string
  code: string
  semester: string
  description: string
  place: string
  menuUrl: string
  classTime: string

  teacherId: string
  disciplineId: string

  teacher?: ITeacherViewModel

  createdAt: string
  updatedAt: string
}
