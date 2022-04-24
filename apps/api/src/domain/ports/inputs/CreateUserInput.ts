import { IUserType } from '@/domain/entities'

export interface ICreateUserInput {
  name: string
  email: string
  password: string
  type?: IUserType
}
