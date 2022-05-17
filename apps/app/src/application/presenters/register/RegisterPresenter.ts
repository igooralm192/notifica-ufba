import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
} from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'

import { IAlertManager } from '@/application/managers'
import { UserMapper } from '@/application/mappers'
import { IAuthStore } from '@/application/stores'
import { IRegisterPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class RegisterPresenter implements IRegisterPresenter {
  loading = false

  constructor(
    private readonly authStore: IAuthStore,
    private readonly alertManager: IAlertManager,
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
  }: ICreateStudentUseCase.Input): Promise<void> {
    this.showLoading()

    const createStudentResult = await this.createStudentUseCase.run({
      name,
      email,
      password,
      matriculation,
      course,
    })

    if (createStudentResult.isLeft()) {
      this.showError(createStudentResult.value)
      this.hideLoading()
      return
    }

    const loginResult = await this.authenticateUserUseCase.run({
      email,
      password,
    })

    if (loginResult.isLeft()) {
      this.showError(loginResult.value)
      this.hideLoading()
      return
    }

    const { token, user } = loginResult.value

    this.authStore.setUser(UserMapper.toViewModel(user))
    this.authStore.setToken(token)

    this.hideLoading()

    return
  }

  private showError(error: BaseError) {
    this.alertManager.show({
      type: 'error',
      title: 'Erro ao fazer cadastro.',
      message: error.message,
    })
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }
}
