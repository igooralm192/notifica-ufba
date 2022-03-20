import Input from '@/ui/components/Input'
import { useLogin } from '@/ui/contexts'

import React from 'react'
import { Text, TextInput, View } from 'react-native'

interface ILoginFormValues {
  email: string
  password: string
}

const LoginScreen: React.FC = () => {
  const {
    presenter,
    state: { errors },
  } = useLogin()

  return (
    <View>
      <TextInput
        onChangeText={value => presenter.validateField('email', value)}
        testID="login-email-input"
      />
      {errors.email && <Text>{errors.email}</Text>}

      <TextInput
        onChangeText={value => presenter.validateField('password', value)}
        testID="login-password-input"
      />
      {errors.password && <Text>{errors.password}</Text>}
    </View>
  )
}

export default LoginScreen
