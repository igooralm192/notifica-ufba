import { IUserDTO } from './UserDTO'

export interface ITeacherDTO {
  id: string
  userId: string
  user?: IUserDTO
  createdAt: Date
  updatedAt: Date
}
