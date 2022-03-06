import Input from '@/ui/components/Input'
import { useLogin } from '@/ui/contexts'

import React from 'react'
import { Text, TextInput, View } from 'react-native'

interface ILoginFormValues {
  email: string
  password: string
}

const LoginScreen: React.FC = () => {
  const presenter = useLogin()

  return (
    <View>
      <TextInput
        onChangeText={value => presenter.validateField('email', value)}
        testID="login-email-input"
      />

      <TextInput
        onChangeText={value => presenter.validateField('password', value)}
        testID="login-password-input"
      />
    </View>
  )
}

export default LoginScreen
