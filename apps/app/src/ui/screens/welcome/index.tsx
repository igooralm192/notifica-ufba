import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import React from 'react'

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
  )
}

export default WelcomeScreen
