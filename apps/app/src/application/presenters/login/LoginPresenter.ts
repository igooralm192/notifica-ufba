import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'

import { IAlertManager } from '@/application/managers'
import { UserMapper } from '@/application/mappers'
import { IAuthStore } from '@/application/stores'
import { ILoginPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  loading = false

  constructor(
    private readonly authStore: IAuthStore,
    private readonly alertManager: IAlertManager,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    makeAutoObservable(this)
  }

  async login({
    email,
    password,
  }: IAuthenticateUserUseCase.Input): Promise<void> {
    this.showLoading()

    const result = await this.authenticateUserUseCase.run({ email, password })

    if (result.isLeft()) {
      const error = result.value

      this.alertManager.show({
        type: 'error',
        title: 'Erro ao fazer login.',
        message: error.message,
      })

      this.hideLoading()
      return
    }

    const { token, user } = result.value

    this.authStore.setUser(UserMapper.toViewModel(user))
    this.authStore.setToken(token)

    this.hideLoading()
    return
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }
}
