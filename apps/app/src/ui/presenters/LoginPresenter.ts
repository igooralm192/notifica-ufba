import { IFormPresenter } from '@/ui/types/form'

export interface ILoginFormValues {
  email: string
  password: string
}

export interface ILoginPresenter extends IFormPresenter<ILoginFormValues> {}
