import { Either } from '@notifica-ufba/utils'

import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors } from '@/domain/usecases'
import { ILoginPresenter } from '@/ui/presenters'

export class MockedLoginPresenter implements ILoginPresenter {
  loading = false

  login(): Promise<Either<ILoginErrors, ILoginOutput>> {
    throw new Error('Method not implemented.')
  }
}
