import { UserEntity } from '@/domain/entities'

export namespace IFindUserByEmailRepository {
  export type Input = string
  // TODO: Handle user error
  export type Output = UserEntity | undefined
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
    matriculation: string
    course: string
  }
  // TODO: Handle user error
  export type Output = UserEntity
}

export interface ICreateUserRepository {
  create(
    params: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output>
}
