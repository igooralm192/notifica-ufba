import { BaseError } from '@notifica-ufba/errors'
import { Either } from '@notifica-ufba/utils'

import { ILoginPresenter } from '@/ui/presenters'

export class MockedLoginPresenter implements ILoginPresenter {
  loading = false
  values = { email: '', password: '' }
  errors = {}

  validate(): void {
    throw new Error('Method not implemented.')
  }

  submit(): Promise<Either<BaseError, any>> {
    throw new Error('Method not implemented.')
  }
}
