import { LoginPresenter } from '@/application/presenters/login'
import { LoginUseCase } from '@/domain/usecases'
import { AxiosHttpClient } from '@/infra/http/axios'
import { LoginJoiValidation } from '@/infra/validation/joi'
import { PresenterProvider } from '@/ui/contexts'
import { themeOptions } from '@/ui/theme'
import { ThemeProvider } from '@rneui/themed'

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import faker from 'faker'
import React from 'react'

import { LoginScreen } from '@/ui/screens'
import { NavigationContainer } from '@react-navigation/native'
import { AllProviders } from '@/ui/components'

jest.mock('axios')
jest.mock('react-native-ratings')
jest.mock('@react-navigation/native', () => ({
  useNavigate: jest.fn(),
}))

describe('LoginScreen', () => {
  // it('should validate inputs and update values', async () => {
  //   const presenter = new LoginPresenter(
  //     new LoginJoiValidation(),
  //     new LoginUseCase(new AxiosHttpClient()),
  //   )

  //   const screen = render(<LoginScreen />, {
  //     wrapper: props => (
  //       <PresenterProvider presenter={presenter} {...props}></PresenterProvider>
  //     ),
  //   })

  //   const email = faker.internet.email()
  //   const password = faker.internet.password(6)

  //   const emailInput = await screen.findByTestId('login-email-input')
  //   fireEvent.changeText(emailInput, email)

  //   const passwordInput = await screen.findByTestId('login-password-input')
  //   fireEvent.changeText(passwordInput, password)

  //   await waitFor(() => {
  //     expect(emailInput.props.value).toBe(email)
  //     expect(passwordInput.props.value).toBe(password)
  //   })
  // })

  it.only('should present error if email is invalid', async () => {
    const presenter = new LoginPresenter(
      new LoginJoiValidation(),
      new LoginUseCase(new AxiosHttpClient()),
    )

    const screen = render(<LoginScreen presenter={presenter} />, {
      wrapper: AllProviders,
    })

    const emailInput = await screen.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, 'any_email')

    await waitFor(() =>
      expect(screen.queryByText('E-mail inválido.')).toBeTruthy(),
    )

    const passwordInput = await screen.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, 'pass')

    await waitFor(() =>
      expect(
        screen.queryByText('Senha precisa ter no mínimo 6 caracteres.'),
      ).toBeTruthy(),
    )
  })

  // it('should present error if password is invalid', async () => {
  //   const presenter = new LoginPresenter(
  //     new LoginJoiValidation(),
  //     new LoginUseCase(new AxiosHttpClient()),
  //   )

  //   const screen = render(<LoginScreen />, {
  //     wrapper: props => (
  //       <PresenterProvider presenter={presenter} {...props}></PresenterProvider>
  //     ),
  //   })

  //   const emailInput = await screen.findByTestId('login-email-input')
  //   fireEvent.changeText(emailInput, 'any_email@email.com')

  //   const passwordInput = await screen.findByTestId('login-password-input')
  //   fireEvent.changeText(passwordInput, 'pass')

  //   await waitFor(() =>
  //     expect(
  //       screen.queryByText('Senha precisa ter no mínimo 6 caracteres.'),
  //     ).toBeTruthy(),
  //   )
  // })

  // it('should present error if password is invalid', async () => {
  //   const validation = new FakeValidation()
  //   const presenter = new LoginPresenter(validation)

  //   jest
  //     .spyOn(validation, 'validate')
  //     .mockResolvedValueOnce(new CommonError.ValidationError('any_message'))

  //   const screen = render(<LoginScreen />, {
  //     wrapper: props => (
  //       <LoginProvider presenter={presenter} {...props}></LoginProvider>
  //     ),
  //   })

  //   const passwordInput = await screen.findByTestId('login-password-input')
  //   fireEvent.changeText(passwordInput, 'any_password')

  //   await waitFor(() => expect(screen.queryByText('any_message')).toBeTruthy())
  // })
})
