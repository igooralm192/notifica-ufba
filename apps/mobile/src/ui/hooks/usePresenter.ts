import { BasePresenter } from '@/presentation/helpers'
import { useEffect, useState } from 'react'

export function usePresenterState<S>(presenter: BasePresenter<S>) {
  const [state, setState] = useState(presenter.state)

  useEffect(() => {
    const stateSubscription = (state: S) => {
      setState(state)
    }

    presenter.subscribe(stateSubscription)

    return () => presenter.unsubscribe(stateSubscription)
  }, [presenter])

  return state
}
