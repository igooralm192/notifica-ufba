export interface IPresenter<S = any> {
  state: S
  subscribe: (listener: (state: S) => void) => () => void
}
