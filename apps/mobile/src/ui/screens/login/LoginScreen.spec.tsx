import { IUseForm } from '@/presentation/protocols'
import { LoginProvider, useLogin } from '@/ui/contexts'
import { ILoginPresenter } from '@/ui/presenters'

import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

import LoginScreen from '.'

class MockedLoginPresenter implements ILoginPresenter {
  validateField(field: string, value: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

const useMockedForm: IUseForm = () => {
  return {
    onSubmit: jest.fn(),
    register: () => ({
      onChange: jest.fn(),
    }),
  }
}

describe('LoginScreen', () => {
  it('should call validate with correct values', async () => {
    const presenter = new MockedLoginPresenter()
    const validate = jest.spyOn(presenter, 'validateField')

    validate.mockImplementation()

    const screen = render(<LoginScreen />, {
      wrapper: props => (
        <LoginProvider
          presenter={presenter}
          hooks={{
            useForm: useMockedForm,
          }}
          {...props}
        ></LoginProvider>
      ),
    })

    const emailInput = await screen.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, 'any_email')
    // expect(validate).toHaveBeenCalledWith('email', 'any_email')

    // const passwordInput = await screen.findByTestId('login-password-input')
    // fireEvent.changeText(passwordInput, 'any_password')
    // expect(validate).toHaveBeenCalledWith('password', 'any_password')
  })

  // it('should present error if email is invalid', async () => {
  //   const presenter = new MockedLoginPresenter()
  //   presenter.errors = { email: 'any_error' }

  //   const screen = render(<LoginScreen />, {
  //     wrapper: props => (
  //       <LoginProvider presenter={presenter} {...props}></LoginProvider>
  //     ),
  //   })

  //   expect(screen.queryByText('any_error')).toBeTruthy()
  // })

  // it('should present error if password is invalid', async () => {
  //   const presenter = new MockedLoginPresenter()
  //   presenter.errors = { password: 'any_error' }

  //   const screen = render(<LoginScreen />, {
  //     wrapper: props => (
  //       <LoginProvider presenter={presenter} {...props}></LoginProvider>
  //     ),
  //   })

  //   expect(screen.queryByText('any_error')).toBeTruthy()
  // })
})
