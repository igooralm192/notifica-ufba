import Routes from '@/main/routes'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  )
}

export default App
