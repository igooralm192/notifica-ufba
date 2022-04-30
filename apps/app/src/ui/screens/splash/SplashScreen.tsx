import { ISplashPresenter } from '@/ui/presenters'
import React, { useEffect } from 'react'

import { Container, Spinner } from './SplashStyles'

export interface SplashScreenProps {
  presenter: ISplashPresenter
}

const SplashScreen: React.FC<SplashScreenProps> = ({ presenter }) => {
  useEffect(() => {
    presenter.load()
  }, [])

  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default SplashScreen
