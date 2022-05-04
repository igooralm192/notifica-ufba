import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { Either } from '@notifica-ufba/utils'

export interface ILoginFormValues {
  email: string
  password: string
}

export interface ILoginPresenter {
  loading: boolean
  login(
    input: IAuthenticateUserUseCase.Input,
  ): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  >
}
