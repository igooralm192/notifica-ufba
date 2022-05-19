import { IUserViewModel } from './UserViewModel'

export interface ITeacherViewModel {
  id: string
  userId: string
  user?: IUserViewModel
  createdAt: string
  updatedAt: string
}
