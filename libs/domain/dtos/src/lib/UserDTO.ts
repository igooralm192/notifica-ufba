import { IStudentDTO } from './StudentDTO'
import { ITeacherDTO } from './TeacherDTO'

export interface IUserDTO {
  id: string
  name: string
  email: string
  type: 'STUDENT' | 'TEACHER'
  pushToken?: string

  teacher?: ITeacherDTO
  student?: IStudentDTO

  createdAt: Date
  updatedAt: Date
}
