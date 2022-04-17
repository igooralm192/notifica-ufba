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

export interface ILoginPresenter extends IFormData<ILoginFormValues> {
  isLoading: boolean
  error?: string
  validate(field: keyof ILoginFormValues, value: any): void
  login(email: string, password: string): Promise<void>
  setError(error?: string): void
}
