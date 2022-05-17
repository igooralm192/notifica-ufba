import { IUser } from './User'

export interface IStudent {
  id: string
  matriculation: string
  course: string
  userId: string
  user?: IUser
  createdAt: Date
  updatedAt: Date
}
