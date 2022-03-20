import { usePresenterState } from '@/ui/hooks/usePresenter'
import { ILoginPresenter, LoginPresenter } from '@/ui/presenters'

import React, { useContext } from 'react'

const LoginContext = React.createContext(
  {} as { presenter: ILoginPresenter; state: LoginPresenter.State },
)

const LoginProvider: React.FC<{ presenter: ILoginPresenter }> = ({
  presenter,
  children,
}) => {
  const state = usePresenterState(presenter)

  return (
    <LoginContext.Provider value={{ presenter, state }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
