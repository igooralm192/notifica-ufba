import { ILoginOutput } from '@/domain/ports/outputs'

import { ILoginViewModel } from '@/application/models/login'
import { IPresenterResponse } from '@/application/presenters/Presenter'

import { Presenter } from '../Presenter'

export class LoginPresenter extends Presenter {
  ok({ token, user }: ILoginOutput): IPresenterResponse<ILoginViewModel> {
    return super.ok({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
      },
    })
  }
}
