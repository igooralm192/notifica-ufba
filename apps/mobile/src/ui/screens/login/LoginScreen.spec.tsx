import { LoginJoiValidation } from '@/infra/validation/joi'
import { LoginPresenter } from '@/presentation/presenters/login'
import { IValidation } from '@/presentation/protocols'
import { LoginProvider } from '@/ui/contexts'
import { CommonError } from '@notifica-ufba/domain/errors'

import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

import LoginScreen from '.'

class FakeValidation implements IValidation {
  validate(input: any): Promise<CommonError.ValidationError> {
    return Promise.resolve(null)
  }
}

describe('LoginScreen', () => {
  it('should call validate with correct values', async () => {
    const presenter = new LoginPresenter(new FakeValidation())
    const validate = jest.spyOn(presenter, 'validateField')

    const screen = render(<LoginScreen />, {
      wrapper: props => (
        <LoginProvider presenter={presenter} {...props}></LoginProvider>
      ),
    })

    const emailInput = await screen.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, 'any_email@email.com')
    await waitFor(() =>
      expect(validate).toHaveBeenCalledWith('email', 'any_email@email.com'),
    )

    const passwordInput = await screen.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, 'any_password')
    await waitFor(() =>
      expect(validate).toHaveBeenCalledWith('password', 'any_password'),
    )
  })

  it('should present error if email is invalid', async () => {
    const validation = new FakeValidation()
    const presenter = new LoginPresenter(validation)

    jest
      .spyOn(validation, 'validate')
      .mockResolvedValueOnce(new CommonError.ValidationError('any_message'))

    const screen = render(<LoginScreen />, {
      wrapper: props => (
        <LoginProvider presenter={presenter} {...props}></LoginProvider>
      ),
    })

    const emailInput = await screen.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, 'any_email')

    await waitFor(() => expect(screen.queryByText('any_message')).toBeTruthy())
  })

  it('should present error if password is invalid', async () => {
    const validation = new FakeValidation()
    const presenter = new LoginPresenter(validation)

    jest
      .spyOn(validation, 'validate')
      .mockResolvedValueOnce(new CommonError.ValidationError('any_message'))

    const screen = render(<LoginScreen />, {
      wrapper: props => (
        <LoginProvider presenter={presenter} {...props}></LoginProvider>
      ),
    })

    const passwordInput = await screen.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, 'any_password')

    await waitFor(() => expect(screen.queryByText('any_message')).toBeTruthy())
  })
})
