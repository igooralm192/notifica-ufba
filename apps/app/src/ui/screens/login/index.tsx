import { usePresenter } from '@/ui/contexts'
import { ILoginPresenter } from '@/ui/presenters'

import React from 'react'
import { Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen: React.FC = () => {
  const { presenter } = useLogin()

  const {
    form: { values, errors },
  } = presenter.state

  return (
    <SafeAreaView>
      <TextInput
        style={{ backgroundColor: 'blue' }}
        value={values.email}
        onChangeText={value => presenter.validate('email', value)}
        testID="login-email-input"
      />
      {errors.email && <Text>{errors.email}</Text>}

      <TextInput
        style={{ backgroundColor: 'red' }}
        value={values.password}
        onChangeText={value => presenter.validate('password', value)}
        testID="login-password-input"
      />
      {errors.password && <Text>{errors.password}</Text>}
    </SafeAreaView>
  )
}

const useLogin = () => usePresenter<ILoginPresenter>()

export default LoginScreen
