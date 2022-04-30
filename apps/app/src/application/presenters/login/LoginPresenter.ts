import { Either } from '@notifica-ufba/utils'

import { ILoginInput } from '@/domain/ports/inputs'
import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors, ILoginUseCase } from '@/domain/usecases'

import { IAuthStore } from '@/application/stores'
import { UserViewModel } from '@/application/models'

import { ILoginPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  loading = false

  constructor(
    private readonly authStore: IAuthStore,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    makeAutoObservable(this)
  }

  async login({
    email,
    password,
  }: ILoginInput): Promise<Either<ILoginErrors, ILoginOutput>> {
    this.showLoading()

    const result = await this.loginUseCase.run({ email, password })

    if (result.isLeft()) {
      this.hideLoading()
      return result
    }

    this.authStore.setUser(UserViewModel.fromDTO(result.right().user))
    this.authStore.setToken(result.right().token)
    this.hideLoading()

    return result
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }
}
