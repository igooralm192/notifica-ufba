import { AllProviders } from '@/components'
import Routes from '@/routes'

import React from 'react'

const App: React.FC = () => {
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  )
}

export default App
