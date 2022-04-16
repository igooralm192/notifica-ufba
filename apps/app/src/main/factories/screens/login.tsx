import { makeLoginPresenter } from '@/main/factories/presenters'
import { LoginScreen } from '@/ui/screens'

import React from 'react'

export const LoginScreenFactory: React.FC = () => {
  return <LoginScreen presenter={makeLoginPresenter()} />
}
