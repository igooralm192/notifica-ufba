import { IPresenter } from '@/ui/protocols'

import { autorun, comparer, reaction } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { deepObserve } from 'mobx-utils'
import React, { useContext, useEffect, useState } from 'react'

const PresenterContext = React.createContext({} as { presenter: IPresenter })

const PresenterProvider: React.FC<{ presenter: IPresenter }> = ({
  children,
  presenter,
}) => {
  useEffect(() => {
    const disposer = deepObserve(
      () => presenter,
      () => {
        // @ts-ignore
        console.log('UÉ', presenter.values)
      },
    )

    return () => disposer()
  }, [])

  return (
    <PresenterContext.Provider value={{ presenter }}>
      {children}
    </PresenterContext.Provider>
  )
}
export const usePresenter = <T extends IPresenter>() =>
  useContext(PresenterContext) as { presenter: T }

export default observer(PresenterProvider)
