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
    super({
      isLoading: false,
      form: { values: { email: '', password: '' }, errors: {} },
    })
  }

  validate(field: keyof ILoginFormValues, value: any): void {
    this.state.form.values[field] = value

    const error = this.validation.validate(field, value)

    this.state.form.errors[field] = error?.message

    this.notify()
  }

  async login(): Promise<void> {
    this.state.isLoading = true
    this.notify()

    const result = await this.loginUseCase.run(this.state.form.values)
    if (result.isLeft()) {
      console.log(result.left())
      this.state.error = result.left().message
      this.state.isLoading = false
      this.notify()
      return
    }

    // TODO: Navigate to another screen
  }

  setError(error?: string): void {
    this.state.error = error
    this.notify()
  }
}
