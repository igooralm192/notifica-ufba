import { Presenter } from '@/application/presenters/Presenter'
import { IValidation } from '@/domain/ports/validation'
import { ILoginUseCase } from '@/domain/usecases'
import { ILoginFormValues, ILoginPresenter } from '@/ui/presenters'

export class LoginPresenter
  extends Presenter<ILoginPresenter.State>
  implements ILoginPresenter
{
  constructor(
    private readonly validation: IValidation,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    super({ form: { values: { email: '', password: '' }, errors: {} } })
  }

  validate(field: keyof ILoginFormValues, value: any): void {
    this.state.form.values[field] = value

    const error = this.validation.validate(field, value)

    this.state.form.errors[field] = error?.message

    this.notify()
  }

  async login(): Promise<void> {
    const result = await this.loginUseCase.run(this.state.form.values)

    if (result.isLeft()) {
      this.state.error = result.left().message
      return
    }

    // TODO: Navigate to another screen
  }
}
