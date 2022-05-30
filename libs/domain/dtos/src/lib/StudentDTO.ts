import { IUserDTO } from './UserDTO'

export interface IStudentDTO {
  id: string
  matriculation: string
  course: string
  userId: string
  user?: IUserDTO
  createdAt: string
  updatedAt: string
}
