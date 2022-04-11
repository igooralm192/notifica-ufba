import { LoginScreenFactory } from '@/main/factories/screens'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreenFactory} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
