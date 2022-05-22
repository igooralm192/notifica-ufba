import React from 'react'

import { Container, Spinner } from './SplashStyles'

export interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default SplashScreen
