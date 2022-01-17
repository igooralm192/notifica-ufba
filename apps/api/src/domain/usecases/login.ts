import { UserEntity } from '@notifica-ufba/domain/entities'
import { CommonErrors, LoginErrors } from '@notifica-ufba/domain/errors'
import { UseCase, Either } from '@notifica-ufba/utils'

export namespace LoginUseCase {
  export type Params = {
    email: string
    password: string
  }

  export type Errors = LoginErrors | CommonErrors

  export type Result = Either<
    LoginUseCase.Errors,
    {
      token: string
      user: UserEntity
    }
  >
}

export type ILoginUseCase = UseCase<LoginUseCase.Params, LoginUseCase.Result>
