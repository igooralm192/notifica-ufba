import { IStudent } from './Student'
import { ITeacher } from './Teacher'

export type IUserType = 'STUDENT' | 'TEACHER'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  type: IUserType

  teacher?: ITeacher
  student?: IStudent

  createdAt: Date
  updatedAt: Date
}
