import { IUserType, UserEntity } from '@/domain/entities'

export namespace IFindUserByEmailRepository {
  export type Input = string
  // TODO: Handle user error
  export type Output = UserEntity | null
}

export interface IFindUserByEmailRepository {
  findByEmail(
    email: IFindUserByEmailRepository.Input,
  ): Promise<IFindUserByEmailRepository.Output>
}

export namespace ICreateUserRepository {
  export type Input = {
    name: string
    email: string
    password: string
    type: IUserType
  }
  // TODO: Handle user error
  export type Output = UserEntity
}

export interface ICreateUserRepository {
  create(
    params: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output>
}
