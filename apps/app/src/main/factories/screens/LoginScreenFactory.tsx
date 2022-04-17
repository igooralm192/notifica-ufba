import { LoginScreen } from '@/ui/screens'
import { makeLoginPresenter } from '@/main/factories/presenters'

import React from 'react'

export const LoginScreenFactory: React.FC = () => {
  const loginPresenter = makeLoginPresenter()

  return <LoginScreen presenter={loginPresenter} />
}
