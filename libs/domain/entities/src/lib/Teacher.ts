import { IUser } from './User'

export interface ITeacher {
  id: string

  user?: IUser
  userId: string

  createdAt: Date
  updatedAt: Date
}
