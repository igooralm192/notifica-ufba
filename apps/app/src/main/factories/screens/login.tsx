import { makeLoginPresenter } from '@/main/factories/presenters'
import { PresenterProvider } from '@/ui/contexts'
import { LoginScreen } from '@/ui/screens'

import React from 'react'

export const LoginScreenFactory: React.FC = () => {
  return (
    <PresenterProvider presenter={makeLoginPresenter()}>
      <LoginScreen />
    </PresenterProvider>
  )
}
