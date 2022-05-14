import { IEntity } from '../interfaces'
import { IUserEntity } from './UserEntity'

export interface IStudentEntity extends IEntity {
  matriculation: string
  course: string
  userId: string
  user?: IUserEntity
}
