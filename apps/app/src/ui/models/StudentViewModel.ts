import { IUserViewModel } from './UserViewModel'

export interface IStudentViewModel {
  id: string
  matriculation: string
  course: string
  userId: string
  user?: IUserViewModel
  createdAt: string
  updatedAt: string
}
