export type IUserType = 'STUDENT' | 'TEACHER'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  type: IUserType

  createdAt: Date
  updatedAt: Date
}
