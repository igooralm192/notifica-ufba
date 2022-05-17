export namespace IAlertManager {
  export type Input = {
    type: 'success' | 'error'
    title: string
    message: string
  }
}

export interface IAlertManager {
  show(input: IAlertManager.Input): void
}
