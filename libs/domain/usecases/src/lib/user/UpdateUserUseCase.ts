import { IUser } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IUpdateUserUseCase {
  export type Input = {
    id: { userId?: string }
    data: {
      pushToken?: string
    }
  }

  export type Output = {
    user: IUser
  }
}

export type IUpdateUserUseCase = UseCase<
  IUpdateUserUseCase.Input,
  Either<BaseError, IUpdateUserUseCase.Output>
>
