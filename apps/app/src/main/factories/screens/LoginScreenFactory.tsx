import { LoginScreen } from '@/ui/screens'
import { makeLoginPresenter } from '@/main/factories/presenters'
import { makeLoginValidation } from '@/main/factories/validation'

import React from 'react'

export const LoginScreenFactory: React.FC = () => {
  const loginValidation = makeLoginValidation()
  const loginPresenter = makeLoginPresenter()

  return <LoginScreen validation={loginValidation} presenter={loginPresenter} />
}
