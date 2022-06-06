import { AuthState, useAuth } from '@/contexts/auth'
import { BottomTabsNavigator } from '@/routes/bottom-tabs'
import { AppNavigation } from '@/types/navigation'
import {
  DisciplineGroupMessagesScreen,
  DisciplineGroupScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WelcomeScreen,
} from '@/screens'
import { ITheme } from '@/styles/theme'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTheme } from '@rneui/themed'

const Stack = createStackNavigator<AppNavigation>()

const getAuthScreens = (state: AuthState, theme: ITheme) => {
  switch (state) {
    case AuthState.UNAUTHENTICATED:
      return (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Group>
      )
    case AuthState.AUTHENTICATED:
      return (
        <Stack.Group>
          <Stack.Screen
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
          />

          <Stack.Screen
            name="DisciplineGroupMessagesScreen"
            component={DisciplineGroupMessagesScreen}
          />
          <Stack.Screen
            name="DisciplineGroupScreen"
            component={DisciplineGroupScreen}
          />
        </Stack.Group>
      )
    default:
      return (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      )
  }
}

const Routes: React.FC = () => {
  const auth = useAuth()
  const { theme: rneTheme } = useTheme()

  if (auth.loading || auth.state === AuthState.UNKNOWN) return <SplashScreen />

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {getAuthScreens(auth.state, rneTheme)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
}

export default Routes
