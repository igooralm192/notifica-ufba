import { User } from '@notifica-ufba/domain/entities'

export namespace FindUserByEmailRepository {
  export type Params = string

  export type Result = User | null
}

export interface IFindUserByEmailRepository {
  findByEmail(
    email: FindUserByEmailRepository.Params,
  ): Promise<FindUserByEmailRepository.Result>
}
