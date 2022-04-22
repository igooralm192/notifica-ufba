import { Header } from '@/ui/components/Header'
import {
  LoginScreenFactory,
  WelcomeScreenFactory,
} from '@/main/factories/screens'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ header: Header }}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreenFactory}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreenFactory} />
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
