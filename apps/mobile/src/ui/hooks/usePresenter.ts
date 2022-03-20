import { IPresenter } from '@/presentation/protocols'
import { useEffect, useState } from 'react'

export function usePresenterState<S>(presenter: IPresenter<S>) {
  const [state, setState] = useState(presenter.state)

  useEffect(() => {
    const unsubscribe = presenter.subscribe(newState => {
      setState({ ...newState })
    })

    return () => unsubscribe()
  }, [presenter])

  return state
}
