import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { Either } from '@notifica-ufba/utils'

import { IAuthStore } from '@/application/stores'
import { UserViewModel } from '@/application/models'
import { ILoginPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  loading = false

  constructor(
    private readonly authStore: IAuthStore,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    makeAutoObservable(this)
  }

  async login({
    email,
    password,
  }: IAuthenticateUserUseCase.Input): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  > {
    this.showLoading()

    const result = await this.authenticateUserUseCase.run({ email, password })

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
