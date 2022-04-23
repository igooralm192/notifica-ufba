import { IUserDTO } from '@/domain/dtos'

export interface ICreateUserOutput {
  token: string
  user: IUserDTO
}
