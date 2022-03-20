import { BasePresenter } from '@/presentation/helpers'
import { IValidation } from '@/presentation/protocols'
import { LoginPresenter as Presenter, ILoginPresenter } from '@/ui/presenters'

export class LoginPresenter
  extends BasePresenter<Presenter.State>
  implements ILoginPresenter
{
  constructor(private readonly validation: IValidation) {
    super({ values: { email: '', password: '' }, errors: {} })
  }

  async validateField(field: string, value: any): Promise<void> {
    this.state.values[field] = value

    const error = await this.validation.validate(this.state.values)

    if (error) {
      this.state.errors[field] = error.message
    }

    this.notify()
  }
}
