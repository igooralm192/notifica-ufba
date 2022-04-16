import { themeOptions } from '@/ui/theme'
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider, useTheme } from '@rneui/themed'

import AppLoading from 'expo-app-loading'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ThemeProvider as StyledProvider } from 'styled-components/native'

export const LayoutProvider: React.FC = ({ children }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>
}

export const UIProvider: React.FC = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
}

export const StyleProvider: React.FC = ({ children }) => {
  const { theme } = useTheme()

  return <StyledProvider theme={theme}>{children}</StyledProvider>
}

export const AlertProvider: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}

export const NavigationProvider: React.FC = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}

export const AllProviders: React.FC = ({ children }) => {
  return (
    <LayoutProvider>
      <UIProvider>
        <StyleProvider>
          <AlertProvider>{children}</AlertProvider>
        </StyleProvider>
      </UIProvider>
    </LayoutProvider>
  )
}
