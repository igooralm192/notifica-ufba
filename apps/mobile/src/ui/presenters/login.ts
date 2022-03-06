export namespace LoginPresenter {
  export type State = {
    email: string
    password: string
  }

  export type Errors = {
    email?: string
    password?: string
  }
}

export interface ILoginPresenter {
  validateField(field: string, value: any): Promise<void>
}
