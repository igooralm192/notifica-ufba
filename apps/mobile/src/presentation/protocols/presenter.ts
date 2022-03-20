export type IPresenterSubscription<S> = (state: S) => void

export interface IPresenter<S> {
  state: S
  notify: () => void
  subscribe: (subscription: IPresenterSubscription<S>) => () => void
}
