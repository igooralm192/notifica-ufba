import { Button, Input } from '@/ui/components'
import { usePresenter } from '@/ui/contexts'
import { ILoginPresenter } from '@/ui/presenters'

import {observer} from 'mobx-react'
import React, { useEffect } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import Toast from 'react-native-toast-message'

import {
  Container,
  Logo,
  WelcomeText,
  InputContainer,
  ButtonContainer,
} from './LoginStyles'

const FormContainer: React.FC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.select({
          ios: 120,
          android: 10,
        })}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const LoginScreen: React.FC<{ presenter: ILoginPresenter }> = ({
  presenter,
}) => {
  const { isLoading, values, errors, error } = presenter

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login.',
        text2: error,
        onHide: () => presenter.setError(undefined),
      })
    }
  }, [error])

  return (
    <Container keyboardShouldPersistTaps="handled">
      <FormContainer>
        <Logo />

        <WelcomeText>
          Bem vindo de volta.{'\n'}Faça login na sua conta!
        </WelcomeText>

        <InputContainer>
          <Input
            placeholder="E-mail"
            leftIcon={{ name: 'email' }}
            value={values.email}
            onChangeText={value => presenter.validate('email', value)}
            errorMessage={errors.email}
            renderErrorMessage={!!errors.email}
            autoCapitalize="none"
            testID="login-email-input"
          />
        </InputContainer>

        <InputContainer>
          <Input
            placeholder="Senha"
            leftIcon={{ name: 'lock' }}
            value={values.password}
            onChangeText={value => presenter.validate('password', value)}
            errorMessage={errors.password}
            renderErrorMessage={!!errors.password}
            secureTextEntry
            testID="login-password-input"
          />
        </InputContainer>

        <ButtonContainer>
          <Button
            title="Entrar"
            loading={isLoading}
            onPress={() => presenter.login()}
          />
        </ButtonContainer>
      </FormContainer>
    </Container>
  )
}

const useLogin = () => usePresenter<ILoginPresenter>()

export default observer(LoginScreen)
