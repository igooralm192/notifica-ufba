import Routes from '@/main/routes'
import { themeOptions } from '@/ui/theme'

import { ThemeProvider as StyledProvider } from 'styled-components/native'
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'
import { ThemeProvider, useTheme } from '@rneui/themed'
import AppLoading from 'expo-app-loading'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const StyleProvider: React.FC = ({ children }) => {
  const { theme } = useTheme()

  return <StyledProvider theme={theme}>{children}</StyledProvider>
}

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={themeOptions}>
        <StyleProvider>
          <Routes />

          <Toast />
        </StyleProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
