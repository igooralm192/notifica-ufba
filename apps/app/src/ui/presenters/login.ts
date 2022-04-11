import { IPresenter } from '@/ui/protocols'

export interface ILoginFormValues {
  email: string
  password: string
}

interface IFormData<T> {
  values: {
    [K in keyof T]: T[K]
  }
  errors: {
    [K in keyof T]?: string
  }
}

export namespace ILoginPresenter {
  export type State = {
    form: IFormData<ILoginFormValues>
    error?: string
  }
}

export interface ILoginPresenter extends IPresenter<ILoginPresenter.State> {
  validate(field: keyof ILoginFormValues, value: any): void
  login(): Promise<void>
}
