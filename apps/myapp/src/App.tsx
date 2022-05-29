import { AllProviders } from '@/components'
import Routes from '@/routes'

import OneSignal from 'react-native-onesignal'
import Constants from 'expo-constants'
import { useEffect } from 'react'

OneSignal.setAppId(Constants?.manifest?.extra?.oneSignalAppId)

const App: React.FC = () => {
  useEffect(() => {
    OneSignal.sendTag('discipline_group_code', 't010000')

    OneSignal.addSubscriptionObserver(event => {
      console.log(event)
    })

    OneSignal.setNotificationWillShowInForegroundHandler

    return () => {
      OneSignal.clearSubscriptionObservers()
      OneSignal.deleteTag('discipline_group_code')
    }
  }, [])
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  )
}

export default App
