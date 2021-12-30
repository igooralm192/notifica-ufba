import { User } from '@notifica-ufba/domain/entities'

export namespace FindUserByEmailRepository {
  export type Params = string

  export type Result = User | null
}

export interface FindUserByEmailRepository {
  findByEmail(
    email: FindUserByEmailRepository.Params,
  ): Promise<FindUserByEmailRepository.Result>
}
