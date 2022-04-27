import { RegisterScreen } from '@/ui/screens'
import { makeRegisterPresenter } from '@/main/factories/presenters'
import { makeRegisterValidation } from '@/main/factories/validation'

import React from 'react'

export const RegisterScreenFactory: React.FC = () => {
  const registerValidation = makeRegisterValidation()
  const registerPresenter = makeRegisterPresenter()

  return (
    <RegisterScreen
      validation={registerValidation}
      presenter={registerPresenter}
    />
  )
}
