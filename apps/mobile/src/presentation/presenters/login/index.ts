import { BasePresenter } from '@/presentation/helpers'
import { IValidation } from '@/presentation/protocols'
import { LoginPresenter as Presenter, ILoginPresenter } from '@/ui/presenters'

export class LoginPresenter
  extends BasePresenter<Presenter.State>
  implements ILoginPresenter
{
  constructor(private readonly validation: IValidation) {
    super({ email: '', password: '' })
  }

  async validateField(field: string, value: any): Promise<void> {
    this.changeState({ ...this.state, [field]: value })

    const error = await this.validation.validate(this.state)

    // if (error) {
    //   this._errors.merge({ [field]: error.message })
    // }
  }
}
