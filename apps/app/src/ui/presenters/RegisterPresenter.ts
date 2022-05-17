import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'

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
  register(input: IAuthenticateUserUseCase.Input): Promise<void>
}
