import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { Either } from '@notifica-ufba/utils'

export interface IRegisterFormValues {
  name: string
  email: string
  matriculation: string
  course: string
  password: string
  confirmPassword: string
}

export interface IRegisterPresenter {
  loading: boolean
  register(
    input: IAuthenticateUserUseCase.Input,
  ): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  >
}
