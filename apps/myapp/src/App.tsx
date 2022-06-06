import { AllProviders } from '@/components'
import Routes from '@/routes'

import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'

const App: React.FC = () => {
  useEffect(() => {
    // TODO: Put appId on .env
    OneSignal.setAppId('a59c34ba-4c7a-4285-8bcc-e6513866508a')
  }, [])

  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  )
}

export default App
