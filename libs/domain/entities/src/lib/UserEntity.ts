import { IEntity } from '../interfaces'

export type IUserType = 'STUDENT' | 'TEACHER'

export interface IUserEntity extends IEntity {
  name: string
  email: string
  password: string
  type: IUserType
}
