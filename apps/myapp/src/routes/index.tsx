import { Header } from '@/components/Header'
import { AuthState, useAuth } from '@/contexts/auth'
import { AppNavigation } from '@/types/navigation'
import {
  DisciplineGroupScreen,
  DisciplinesScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WelcomeScreen,
} from '@/screens'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator<AppNavigation>()

const getAuthScreens = (state: AuthState) => {
  switch (state) {
    case AuthState.UNAUTHENTICATED:
      return (
        <Stack.Group>
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
            name="DisciplinesScreen"
            component={DisciplinesScreen}
            options={{ title: 'Disciplinas' }}
          />
          <Stack.Screen
            name="DisciplineGroupScreen"
            component={DisciplineGroupScreen}
            options={{ title: 'Turma' }}
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

  if (auth.loading || auth.state === AuthState.UNKNOWN) return <SplashScreen />

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ header: Header }}>
        {getAuthScreens(auth.state)}
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
