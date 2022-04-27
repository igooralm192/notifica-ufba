import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { CommonError } from '@/domain/errors'
import { mockLoginOutput } from '@/domain/mocks/outputs'
import { MockedLoginPresenter } from '@/application/mocks/presenters'
import { MockedValidation } from '@/application/mocks/validation'
import { AllProviders } from '@/ui/components'

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import faker from 'faker'
import React from 'react'

import LoginScreen from './LoginScreen'

jest.mock('@react-navigation/native', () => ({
  useNavigate: jest.fn(),
}))

const makeSUT = () => {
  const values = {
    email: faker.internet.email(),
    password: faker.internet.password(6),
  }

  const errors = {
    email: faker.random.words(),
    password: faker.random.words(),
  }

  const loginValidation = new MockedValidation()
  const loginPresenter = new MockedLoginPresenter()

  const validateSpy = jest.spyOn(loginValidation, 'validate')
  validateSpy.mockReturnValue({ errors: {} })

  const loginSpy = jest.spyOn(loginPresenter, 'login')
  loginSpy.mockResolvedValue(right(mockLoginOutput()))

  const screen = render(
    <LoginScreen validation={loginValidation} presenter={loginPresenter} />,
    {
      wrapper: AllProviders,
    },
  )

  return {
    SUT: screen,
    loginPresenter,
    validateSpy,
    loginSpy,
    values,
    errors,
  }
}

describe('LoginScreen', () => {
  it('should call validate when input change text and update values', async () => {
    const { SUT, validateSpy, values } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, values.email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, values.password)

    await waitFor(() => expect(validateSpy).toHaveBeenCalledWith(values))

    expect(emailInput.props.value).toBe(values.email)
    expect(passwordInput.props.value).toBe(values.password)
  })

  it('should show error messages if validation returns errors', async () => {
    const { SUT, validateSpy, values, errors } = makeSUT()

    validateSpy.mockReturnValueOnce({
      errors: {
        email: new CommonError.ValidationError(errors.email, {
          key: 'email',
          value: values.email,
        }),
      },
    })

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, values.email)

    await waitFor(() => expect(SUT.queryByText(errors.email)).toBeTruthy())

    validateSpy.mockReturnValueOnce({
      errors: {
        password: new CommonError.ValidationError(errors.password, {
          key: 'password',
          value: values.password,
        }),
      },
    })

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, values.password)

    await waitFor(() => expect(SUT.queryByText(errors.password)).toBeTruthy())
  })

  it('should call login with email and password after submit', async () => {
    const { SUT, loginSpy, values } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, values.email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, values.password)

    fireEvent.press(SUT.getByText('Entrar'))

    await waitFor(() => expect(loginSpy).toHaveBeenCalledWith(values))
  })

  it('should show toast message if login returns errors', async () => {
    const error = new BaseError(faker.random.word(), faker.random.words())

    const { SUT, loginSpy } = makeSUT()
    loginSpy.mockResolvedValueOnce(left(error))

    fireEvent.press(SUT.getByText('Entrar'))

    await waitFor(() => expect(SUT.getByText('Erro ao fazer login.')))
    expect(SUT.getByText(error.message))
  })
})
