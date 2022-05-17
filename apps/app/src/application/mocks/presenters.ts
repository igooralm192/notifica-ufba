import {
  IDisciplinePresenter,
  ILoginPresenter,
  IRegisterPresenter,
} from '@/ui/presenters'

export class MockedDisciplinePresenter implements IDisciplinePresenter {
  loading = false
  disciplines = { results: [], total: 1 }

  getDisciplines(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
export class MockedLoginPresenter implements ILoginPresenter {
  loading = false

  login(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export class MockedRegisterPresenter implements IRegisterPresenter {
  loading = false

  register(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
