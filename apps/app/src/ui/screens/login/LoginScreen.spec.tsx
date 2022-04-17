import { MockedLoginPresenter } from '@/application/mocks/presenters'
import { LoginScreen } from '@/ui/screens'
import { AllProviders } from '@/ui/components'

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import faker from 'faker'
import React from 'react'

jest.mock('@react-navigation/native', () => ({
  useNavigate: jest.fn(),
}))

const makeSUT = (
  values = { email: '', password: '' },
  errors = {},
  error?: string,
) => {
  const email = faker.internet.email()
  const password = faker.internet.password(6)

  const loginPresenter = new MockedLoginPresenter()
  loginPresenter.values = values
  loginPresenter.errors = errors
  loginPresenter.error = error

  const validateSpy = jest.spyOn(loginPresenter, 'validate')
  validateSpy.mockImplementation()

  const loginSpy = jest.spyOn(loginPresenter, 'login')
  loginSpy.mockImplementation()

  const setErrorSpy = jest.spyOn(loginPresenter, 'setError')
  setErrorSpy.mockImplementation()

  const screen = render(<LoginScreen presenter={loginPresenter} />, {
    wrapper: AllProviders,
  })

  return {
    SUT: screen,
    validateSpy,
    loginSpy,
    setErrorSpy,
    loginPresenter,
    email,
    password,
  }
}

describe('LoginScreen', () => {
  afterEach(() => {
    jest.useFakeTimers()
  })

  it('should call validate when input change text', async () => {
    const { SUT, validateSpy, email, password } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, password)

    expect(validateSpy).toHaveBeenCalledWith('email', email)
    expect(validateSpy).toHaveBeenCalledWith('password', password)
  })

  it('should update values based on presenter values', async () => {
    const values = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const { SUT } = makeSUT(values)

    expect(SUT.getByTestId('login-email-input').props.value).toBe(values.email)
    expect(SUT.getByTestId('login-password-input').props.value).toBe(
      values.password,
    )
  })

  it('should show error messages if presenter has errors', async () => {
    const errors = {
      email: faker.random.words(),
      password: faker.random.words(),
    }
    const { SUT } = makeSUT(undefined, errors)

    expect(SUT.queryByText(errors.email)).toBeTruthy()
    expect(SUT.queryByText(errors.password)).toBeTruthy()
  })

  it('should call login with email and password from presenter values on press button', async () => {
    const values = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const { SUT, loginSpy } = makeSUT(values)

    fireEvent.press(SUT.getByText('Entrar'))

    expect(loginSpy).toHaveBeenCalledWith(values.email, values.password)
  })

  it('should show toast message if presenter has main error', async () => {
    jest.useFakeTimers()

    const error = faker.random.words()
    const { SUT, setErrorSpy } = makeSUT(undefined, undefined, error)

    await waitFor(() => expect(SUT.getByText('Erro ao fazer login.')))
    expect(SUT.getByText(error)).toBeTruthy()

    // On hide toast
    jest.runAllTimers()

    expect(setErrorSpy).toHaveBeenCalledWith(undefined)
  })
})
