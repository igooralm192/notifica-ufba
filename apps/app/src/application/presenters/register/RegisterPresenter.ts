import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
} from '@notifica-ufba/domain/usecases'
import { Either, left } from '@notifica-ufba/utils'

import { IAuthStore } from '@/application/stores'
import { UserViewModel } from '@/application/models'

import { IRegisterPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class RegisterPresenter implements IRegisterPresenter {
  loading = false

  constructor(
    private readonly authStore: IAuthStore,
    private readonly createStudentUseCase: ICreateStudentUseCase,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    makeAutoObservable(this)
  }

  async register({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentUseCase.Input): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  > {
    this.showLoading()

    const createStudentResult = await this.createStudentUseCase.run({
      name,
      email,
      password,
      matriculation,
      course,
    })

    if (createStudentResult.isLeft()) {
      this.hideLoading()
      return left(createStudentResult.value)
    }

    const loginResult = await this.authenticateUserUseCase.run({
      email,
      password,
    })

    if (loginResult.isLeft()) {
      this.hideLoading()
      return left(loginResult.value)
    }

    const { token, user } = loginResult.value

    this.authStore.setUser(UserViewModel.fromDTO(user))
    this.authStore.setToken(token)
    this.hideLoading()

    return loginResult
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }
}
