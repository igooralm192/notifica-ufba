import { ILoginUseCase } from '@/domain/usecases'
import { IAuthStore } from '@/application/stores'
import { ILoginFormValues, ILoginPresenter } from '@/ui/presenters'
import { IValidation } from '@/validation/protocols'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  isLoading = false
  error: ILoginPresenter['error'] = undefined
  values: ILoginPresenter['values'] = { email: '', password: '' }
  errors: ILoginPresenter['errors'] = {}

  constructor(
    private readonly authStore: IAuthStore,
    private readonly validation: IValidation,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    makeAutoObservable(this)
  }

  validate(field: keyof ILoginFormValues, value: any): void {
    this.values[field] = value

    const error = this.validation.validate(this.values)

    this.errors[field] = error?.message
  }

  async login(email: string, password: string): Promise<void> {
    this.validate('email', email)
    this.validate('password', password)

    if (this.hasErrors) {
      return
    }

    this.showLoading()

    const result = await this.loginUseCase.run({ email, password })

    if (result.isLeft()) {
      this.setError(result.left().message)
    } else {
      this.authStore.setUser(result.right().user)
    }

    this.hideLoading()
  }

  setError(error?: string): void {
    this.error = error
  }

  private showLoading() {
    this.isLoading = true
  }

  private hideLoading() {
    this.isLoading = false
  }

  get hasErrors() {
    return Object.values(this.errors).some(value => value !== undefined)
  }
}
