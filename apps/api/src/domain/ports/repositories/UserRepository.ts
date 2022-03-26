import { UserEntity } from '@notifica-ufba/domain/entities'

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
