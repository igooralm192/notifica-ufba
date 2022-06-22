import { useAuth } from '@/contexts/auth'
import { MeProvider } from '@/contexts/me'
import { BottomTabsNavigator } from '@/routes/bottom-tabs'
import { AppNavigation } from '@/types/navigation'
import {
  DisciplineGroupInfoScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WelcomeScreen,
  DisciplineGroupTabsScreen,
} from '@/screens'
import { AuthState } from '@/store/auth/types'

import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator<AppNavigation>()

const Routes: React.FC = () => {
  const auth = useAuth()

  if (auth.state === AuthState.AUTHENTICATED) {
    return (
      <MeProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        </Stack.Navigator>
      </MeProvider>
    )
  }

  if (auth.state === AuthState.UNAUTHENTICATED) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Routes
