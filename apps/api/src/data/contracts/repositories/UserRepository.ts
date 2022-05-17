import { IUserType, IUser } from '@notifica-ufba/domain/entities'

export namespace ICreateUserRepository {
  export type Input = {
    name: string
    email: string
    password: string
    type: IUserType
  }
  export type Output = IUser
}

export interface ICreateUserRepository {
  create(
    input: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output>
}

export namespace IFindOneUserRepository {
  export type Input = {
    email?: string
  }
  export type Output = IUser | null
}

export interface IFindOneUserRepository {
  findOne(
    input: IFindOneUserRepository.Input,
  ): Promise<IFindOneUserRepository.Output>
}
