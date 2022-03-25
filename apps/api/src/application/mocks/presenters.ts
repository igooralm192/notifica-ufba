import { ILoginViewModel } from '@/application/models/login'
import {
  IPresenterResponse,
  Presenter,
} from '@/application/presenters/Presenter'

export class MockedLoginPresenter extends Presenter {
  ok(): IPresenterResponse<ILoginViewModel> {
    throw new Error('Method not implemented.')
  }
}
