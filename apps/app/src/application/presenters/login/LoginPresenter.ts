import { IValidation } from '@/domain/ports/validation'
import { ILoginUseCase } from '@/domain/usecases'
import { ILoginFormValues, ILoginPresenter } from '@/ui/presenters'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  isLoading = false
  error: ILoginPresenter['error'] = undefined
  values: ILoginPresenter['values'] = { email: '', password: '' }
  errors: ILoginPresenter['errors'] = {}

  constructor(
    private readonly validation: IValidation,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    makeAutoObservable(this)
  }

  validate(field: keyof ILoginFormValues, value: any): void {
    this.values[field] = value

    const error = this.validation.validate(field, value)

    this.errors[field] = error?.message
  }

  async login(): Promise<void> {
    this.validate('email', this.values.email)
    this.validate('password', this.values.password)

    if (this.hasErrors) {
      return
    }

    this.showLoading()

    const result = await this.loginUseCase.run(this.values)

    if (result.isLeft()) {
      this.error = result.left().message
    }

    this.hideLoading()

    // TODO: Navigate to another screen
  }

  setError(error?: string): void {
    this.error = error
    // this.notify()
  }

  private showLoading() {
    this.isLoading = true
    // this.notify()
  }

  private hideLoading() {
    this.isLoading = false
    // this.notify()
  }

  get hasErrors() {
    return Object.values(this.errors).some(value => value !== undefined)
  }
}
