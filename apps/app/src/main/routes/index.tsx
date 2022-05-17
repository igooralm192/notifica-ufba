import { AuthState } from '@/application/stores'
import { Header } from '@/ui/components/Header'
import { AppNavigation } from '@/ui/types/navigation'
import {
  DisciplinesScreenFactory,
  LoginScreenFactory,
  RegisterScreenFactory,
  SplashScreenFactory,
  WelcomeScreenFactory,
} from '@/main/factories/screens'
import { makeAuthStore } from '@/main/factories/stores'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { observer } from 'mobx-react'

const Stack = createStackNavigator<AppNavigation>()

const getAuthScreens = (state: AuthState) => {
  switch (state) {
    case AuthState.UNAUTHENTICATED:
      return (
        <Stack.Group>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreenFactory}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreenFactory} />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreenFactory}
          />
        </Stack.Group>
      )
    case AuthState.AUTHENTICATED:
      return (
        <Stack.Group>
          <Stack.Screen
            name="DisciplinesScreen"
            component={DisciplinesScreenFactory}
            options={{ title: 'Disciplinas' }}
          />
        </Stack.Group>
      )
    default:
      return (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreenFactory}
          options={{ headerShown: false }}
        />
      )
  }
}

const Routes: React.FC = () => {
  const authStore = makeAuthStore()

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ header: Header }}>
        {getAuthScreens(authStore.state)}
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

export default observer(Routes)
