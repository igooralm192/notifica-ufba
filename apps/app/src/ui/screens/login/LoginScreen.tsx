import { Button, Input } from '@/ui/components'
import { useValidationResolver } from '@/ui/hooks'
import { ILoginFormValues, ILoginPresenter } from '@/ui/presenters'
import { IValidation } from '@/validation/protocols'

import { observer } from 'mobx-react'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'
import Toast from 'react-native-toast-message'

import {
  Container,
  Logo,
  WelcomeText,
  InputContainer,
  ButtonContainer,
} from './LoginStyles'

interface LoginScreenProps {
  validation: IValidation
  presenter: ILoginPresenter
}

const LoginScreen: React.FC<LoginScreenProps> = ({ validation, presenter }) => {
  const resolver = useValidationResolver<ILoginFormValues>(validation)

  const form = useForm<ILoginFormValues>({
    mode: 'onChange',
    resolver,
  })

  const passwordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: ILoginFormValues) => {
    Keyboard.dismiss()

    const resultOrError = await presenter.login(values)

    if (resultOrError.isLeft()) {
      const error = resultOrError.left()

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login.',
        text2: error.message,
      })
    }
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <WelcomeText>
        Bem vindo de volta.{'\n'}Faça login na sua conta!
      </WelcomeText>

      <InputContainer>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="E-mail"
              leftIcon={{ name: 'email' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              testID="login-email-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={passwordRef}
              placeholder="Senha"
              leftIcon={{ name: 'lock' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="login-password-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Entrar"
          loading={presenter.loading}
          disabled={presenter.loading || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'login-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default observer(LoginScreen)
