import { IPresenter } from '@/presentation/protocols'

export namespace LoginPresenter {
  export type State = {
    values: {
      email: string
      password: string
    }
    errors: {
      email?: string
      password?: string
    }
  }
}

export interface ILoginPresenter extends IPresenter<LoginPresenter.State> {
  validateField(field: string, value: any): Promise<void>
}
