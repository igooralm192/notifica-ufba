export type IPresenterSubscription<S> = (state: S) => void

export abstract class Presenter<S> {
  private _state: S

  constructor(initialState: S) {
    this._state = initialState
  }

  public get state(): S {
    return this._state
  }

  protected set state(state: S) {
    this._state = state
  }
}
