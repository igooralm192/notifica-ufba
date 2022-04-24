import { BaseError } from '@notifica-ufba/errors'
import { Either, left } from '@notifica-ufba/utils'

import { CommonError } from '@/domain/errors'
import { ILoginInput } from '@/domain/ports/inputs'
import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors, ILoginUseCase } from '@/domain/usecases'

import { IAuthStore } from '@/application/stores'
import { UserViewModel } from '@/application/models'

import { ILoginFormValues, ILoginPresenter } from '@/ui/presenters'
import { IValidation } from '@/validation/protocols'

import { makeAutoObservable } from 'mobx'

export class LoginPresenter implements ILoginPresenter {
  loading = false
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

    const error = this.validation.validate(field, value)

    this.errors[field] = error?.message
  }

  async submit(values: ILoginFormValues): Promise<Either<BaseError, any>> {
    this.validate('email', values.email)
    this.validate('password', values.password)

    if (this.hasErrors) {
      const errorKey = this.firstError!.key as keyof ILoginFormValues
      const errorMessage = this.firstError!.message

      return left(
        new CommonError.ValidationError(errorMessage, {
          key: errorKey,
          value: values[errorKey],
        }),
      )
    }

    return await this.login(values)
  }

  private async login({
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
    this.hideLoading()

    return result
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }

  get hasErrors() {
    return Object.values(this.errors).some(value => value !== undefined)
  }

  get firstError() {
    const error = Object.entries(this.errors).find(([, message]) => {
      return !!message
    })

    return error
      ? {
          key: error[0],
          message: error[1],
        }
      : undefined
  }
}
