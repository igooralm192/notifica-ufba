import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'

export interface ILoginFormValues {
  email: string
  password: string
}

export interface ILoginPresenter {
  loading: boolean
  login(input: IAuthenticateUserUseCase.Input): Promise<void>
}
