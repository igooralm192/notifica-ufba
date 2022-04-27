import { Header } from '@/ui/components/Header'
import { AppNavigation } from '@/ui/types/navigation'
import {
  LoginScreenFactory,
  RegisterScreenFactory,
  WelcomeScreenFactory,
} from '@/main/factories/screens'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator<AppNavigation>()

const Routes: React.FC = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ header: Header, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreenFactory} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreenFactory} />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreenFactory}
          options={{ headerShown: false }}
        />
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
