import { AuthState, useAuth } from '@/contexts/auth'
import { BottomTabsNavigator } from '@/routes/bottom-tabs'
import { AppNavigation } from '@/types/navigation'
import {
  DisciplineGroupMessagesScreen,
  DisciplineGroupInfoScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WelcomeScreen,
  DisciplineGroupTabsScreen,
} from '@/screens'
import { ITheme } from '@/styles/theme'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@rneui/themed'
import React from 'react'

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
            name="DisciplineGroupTabsScreen"
            component={DisciplineGroupTabsScreen}
          />

          <Stack.Screen
            name="DisciplineGroupInfoScreen"
            component={DisciplineGroupInfoScreen}
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
