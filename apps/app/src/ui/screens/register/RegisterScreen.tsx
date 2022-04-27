import { Button, Input } from '@/ui/components'
import { useValidationResolver } from '@/ui/hooks'
import { IRegisterFormValues, IRegisterPresenter } from '@/ui/presenters'
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
} from './RegisterStyles'

interface RegisterScreenProps {
  validation: IValidation
  presenter: IRegisterPresenter
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  validation,
  presenter,
}) => {
  const resolver = useValidationResolver<IRegisterFormValues>(validation)

  const form = useForm<IRegisterFormValues>({
    mode: 'onChange',
    resolver,
  })

  const emailRef = useRef() as React.MutableRefObject<TextInput>
  const matriculationRef = useRef() as React.MutableRefObject<TextInput>
  const courseRef = useRef() as React.MutableRefObject<TextInput>
  const passwordRef = useRef() as React.MutableRefObject<TextInput>
  const confirmPasswordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: IRegisterFormValues) => {
    Keyboard.dismiss()

    const resultOrError = await presenter.register(values)

    if (resultOrError.isLeft()) {
      const error = resultOrError.left()

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer cadastro.',
        text2: error.message,
      })
    }
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <WelcomeText>
        Conheça nossa plataforma.{'\n'}
        Crie já sua conta!
      </WelcomeText>

      <InputContainer>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="Nome"
              leftIcon={{ name: 'person' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => emailRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              textContentType="name"
              testID="register-name-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={emailRef}
              placeholder="E-mail"
              leftIcon={{ name: 'email' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => matriculationRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              testID="register-email-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="matriculation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={matriculationRef}
              placeholder="Matrícula"
              leftIcon={{ name: 'app-registration' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => courseRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              testID="register-matriculation-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="course"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={courseRef}
              placeholder="Curso"
              leftIcon={{ name: 'library-books' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              testID="register-course-input"
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
              onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="register-password-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={confirmPasswordRef}
              placeholder="Confirmar senha"
              leftIcon={{ name: 'lock' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="register-confirm-password-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Cadastrar"
          loading={presenter.loading}
          disabled={presenter.loading || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'register-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default observer(RegisterScreen)
