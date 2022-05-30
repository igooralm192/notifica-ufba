import { IStudentDTO } from './StudentDTO'
import { ITeacherDTO } from './TeacherDTO'

export interface IUserDTO {
  id: string
  name: string
  email: string
  type: 'STUDENT' | 'TEACHER'

  teacher?: ITeacherDTO
  student?: IStudentDTO

  createdAt: string
  updatedAt: string
}
