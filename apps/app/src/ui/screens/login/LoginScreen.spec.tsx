import { LoginPresenter } from '@/application/presenters/login'
import { AuthStore } from '@/application/stores'
import { mockUser } from '@/domain/mocks/entities'
import { LoginUseCase } from '@/domain/usecases'
import { AxiosHttpClient } from '@/infra/http/axios'
import { LoginScreen } from '@/ui/screens'
import { AllProviders } from '@/ui/components'
import { makeLoginValidation } from '@/main/factories/validation'

import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'
import axios, { AxiosResponse } from 'axios'
import faker from 'faker'
import React from 'react'

jest.mock('axios')
jest.mock('react-native-ratings')
jest.mock('@react-navigation/native', () => ({
  useNavigate: jest.fn(),
}))

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosInstance = jest.fn()

mockedAxios.create.mockImplementation(() => mockedAxiosInstance as any)

const makeSUT = () => {
  const email = faker.internet.email()
  const password = faker.internet.password(6)
  const user = mockUser()

  const authStore = new AuthStore()
  const loginValidation = makeLoginValidation()
  const loginUseCase = new LoginUseCase(new AxiosHttpClient())

  const loginPresenter = new LoginPresenter(
    authStore,
    loginValidation,
    loginUseCase,
  )

  const screen = render(<LoginScreen presenter={loginPresenter} />, {
    wrapper: AllProviders,
  })

  return {
    SUT: screen,
    authStore,
    loginValidation,
    loginUseCase,
    loginPresenter,
    email,
    password,
    user,
  }
}

describe('LoginScreen', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should validate inputs and update values', async () => {
    const { SUT, email, password } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, password)

    await waitFor(() => {
      expect(emailInput.props.value).toBe(email)
      expect(passwordInput.props.value).toBe(password)
    })
  })

  it('should present error if form values are invalid', async () => {
    const { SUT } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, faker.random.words())

    await waitFor(() =>
      expect(SUT.queryByText('E-mail inválido.')).toBeTruthy(),
    )

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, faker.internet.password(5))

    await waitFor(() =>
      expect(
        SUT.queryByText('Senha precisa ter no mínimo 6 caracteres.'),
      ).toBeTruthy(),
    )
  })

  it('should press button, authenticate and save user', async () => {
    const { SUT, authStore, email, password, user } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, password)

    mockedAxiosInstance.mockResolvedValueOnce({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt.toISOString(),
          updated_at: user.updatedAt.toISOString(),
        },
      },
      status: 200,
    } as AxiosResponse)

    fireEvent.press(SUT.getByText('Entrar'))

    await waitForElementToBeRemoved(() => SUT.getByTestId('login-loading'))

    expect(authStore.user).toMatchObject(user)
  })

  it.only('should show error message when authentication fails', async () => {
    jest.useFakeTimers()

    const { SUT, loginPresenter, email, password } = makeSUT()

    const emailInput = await SUT.findByTestId('login-email-input')
    fireEvent.changeText(emailInput, email)

    const passwordInput = await SUT.findByTestId('login-password-input')
    fireEvent.changeText(passwordInput, password)

    mockedAxiosInstance.mockRejectedValueOnce({
      data: {},
      status: 500,
    } as AxiosResponse)

    fireEvent.press(SUT.getByText('Entrar'))

    await waitForElementToBeRemoved(() => SUT.getByTestId('login-loading'))
    await waitFor(() => expect(SUT.getByText('Erro ao fazer login.')))

    act(() => {
      jest.runAllTimers()
    })

    expect(loginPresenter.error).toBeUndefined()
  })
})
