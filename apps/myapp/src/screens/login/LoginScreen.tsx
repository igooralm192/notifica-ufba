import { Button, Input } from '@/components'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

import { useLoginPresenter, withLoginPresenter } from './LoginPresenter'
import {
  Container,
  Logo,
  WelcomeText,
  InputContainer,
  ButtonContainer,
} from './LoginStyles'

interface LoginScreenProps {}

export interface ILoginFormValues {
  email: string
  password: string
}

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': `Campo obrigatório.`,
      'string.empty': 'Campo obrigatório.',
      'string.email': `E-mail inválido.`,
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.min': `Senha precisa ter no mínimo 6 caracteres.`,
  }),
})

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const presenter = useLoginPresenter()

  const form = useForm<ILoginFormValues>({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  })

  const passwordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: ILoginFormValues) => {
    Keyboard.dismiss()

    await presenter.login(values)
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

export default withLoginPresenter(LoginScreen)