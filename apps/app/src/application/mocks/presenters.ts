import { ILoginPresenter } from '@/ui/presenters'

export class MockedLoginPresenter implements ILoginPresenter {
  isLoading = false
  error: string | undefined = undefined
  values = { email: '', password: '' }
  errors = {}

  validate(): void {
    throw new Error('Method not implemented.')
  }

  login(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  setError(): void {
    throw new Error('Method not implemented.')
  }
}
