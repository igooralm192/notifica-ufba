import { Either } from '@notifica-ufba/utils'

import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { ILoginPresenter, IRegisterPresenter } from '@/ui/presenters'

export class MockedLoginPresenter implements ILoginPresenter {
  loading = false

  login(): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  > {
    throw new Error('Method not implemented.')
  }
}

export class MockedRegisterPresenter implements IRegisterPresenter {
  loading = false

  register(): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  > {
    throw new Error('Method not implemented.')
  }
}
