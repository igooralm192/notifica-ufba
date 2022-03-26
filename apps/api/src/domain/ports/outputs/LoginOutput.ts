import { IUserDTO } from '@/domain/dtos'

export interface ILoginOutput {
  token: string
  user: IUserDTO
}
