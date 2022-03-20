import { IPresenter, IPresenterSubscription } from '@/presentation/protocols'

export abstract class BasePresenter<S> implements IPresenter<S> {
  private _state: S
  private listeners: IPresenterSubscription<S>[] = []

  constructor(initalState: S) {
    this._state = initalState
  }

  public get state(): S {
    return this._state
  }

  protected set state(state: S) {
    this._state = state
  }

  notify() {
    if (this.listeners.length > 0) {
      this.listeners.forEach(listener => listener(this.state))
    }
  }

  subscribe(listener: IPresenterSubscription<S>) {
    this.listeners.push(listener)

    return () => this.unsubscribe(listener)
  }

  private unsubscribe(listener: IPresenterSubscription<S>) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }
}
