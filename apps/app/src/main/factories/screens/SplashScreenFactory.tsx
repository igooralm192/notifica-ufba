import { SplashScreen } from '@/ui/screens'
import { makeSplashPresenter } from '@/main/factories/presenters'

import React from 'react'

export const SplashScreenFactory: React.FC = () => {
  const splashPresenter = makeSplashPresenter()

  return <SplashScreen presenter={splashPresenter} />
}
