import Routes from '@/main/routes'
import { theme } from '@/ui/theme'

import { ThemeProvider as StyleProvider } from '@emotion/react'
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'
import { ThemeProvider } from '@rneui/themed'
import AppLoading from 'expo-app-loading'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StyleProvider theme={theme}>
          <Routes />
        </StyleProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
