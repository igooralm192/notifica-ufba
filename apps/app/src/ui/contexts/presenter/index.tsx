import { IPresenter } from '@/ui/protocols'

import React, { useContext, useEffect, useState } from 'react'

const PresenterContext = React.createContext({} as { presenter: IPresenter })

const PresenterProvider: React.FC<{ presenter: IPresenter }> = ({
  children,
  presenter,
}) => {
  const [, setState] = useState(presenter.state)

  useEffect(() => {
    const unsubscribe = presenter.subscribe(newState => {
      setState({ ...newState })
    })

    return () => unsubscribe()
  }, [presenter])

  return (
    <PresenterContext.Provider value={{ presenter }}>
      {children}
    </PresenterContext.Provider>
  )
}

export const usePresenter = <T extends IPresenter>() =>
  useContext(PresenterContext) as { presenter: T }

export default PresenterProvider
