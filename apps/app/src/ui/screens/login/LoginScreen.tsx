import { usePresenter } from '@/ui/contexts'
import { ILoginPresenter } from '@/ui/presenters'

import React from 'react'
import { Text, TextInput, View } from 'react-native'

import { Container, Logo, WelcomeText } from './LoginStyles'

const LoginScreen: React.FC = () => {
  const { presenter } = useLogin()

  const {
    form: { values, errors },
  } = presenter.state

  return (
    <Container>
      <Logo />

      <WelcomeText>
        Bem vindo de volta.{'\n'}Faça login na sua conta!
      </WelcomeText>

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
    </Container>
  )
}

const useLogin = () => usePresenter<ILoginPresenter>()

export default LoginScreen
