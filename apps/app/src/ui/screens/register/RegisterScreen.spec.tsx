import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { CommonError } from '@notifica-ufba/domain/errors'
import { mockAuthenticateUserOutput } from '@notifica-ufba/domain/mocks'
import { MockedRegisterPresenter } from '@/application/mocks/presenters'
import { MockedValidation } from '@/application/mocks/validation'
import { AllProviders } from '@/ui/components'

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import faker from 'faker'
import React from 'react'

import RegisterScreen from './RegisterScreen'

jest.mock('@react-navigation/native', () => ({
  useNavigate: jest.fn(),
}))

const makeSUT = () => {
  const values = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
  }

  const errors = {
    email: faker.random.words(),
    password: faker.random.words(),
  }

  const registerValidation = new MockedValidation()
  const registerPresenter = new MockedRegisterPresenter()

  const validateSpy = jest.spyOn(registerValidation, 'validate')
  validateSpy.mockReturnValue({ errors: {} })

  const registerSpy = jest.spyOn(registerPresenter, 'register')
  registerSpy.mockResolvedValue(right(mockAuthenticateUserOutput()))

  const screen = render(
    <RegisterScreen
      validation={registerValidation}
      presenter={registerPresenter}
    />,
    {
      wrapper: AllProviders,
    },
  )

  return {
    SUT: screen,
    registerPresenter,
    validateSpy,
    registerSpy,
    values,
    errors,
  }
}

describe('RegisterScreen', () => {
  it('should call validate when input change text and update values', async () => {
    const { SUT, validateSpy, values } = makeSUT()

    const nameInput = await SUT.findByTestId('register-name-input')
    fireEvent.changeText(nameInput, values.name)

    const emailInput = await SUT.findByTestId('register-email-input')
    fireEvent.changeText(emailInput, values.email)

    const matriculationInput = await SUT.findByTestId(
      'register-matriculation-input',
    )
    fireEvent.changeText(matriculationInput, values.matriculation)

    const courseInput = await SUT.findByTestId('register-course-input')
    fireEvent.changeText(courseInput, values.course)

    const passwordInput = await SUT.findByTestId('register-password-input')
    fireEvent.changeText(passwordInput, values.password)

    await waitFor(() => expect(validateSpy).toHaveBeenCalledWith(values))

    expect(nameInput.props.value).toBe(values.name)
    expect(emailInput.props.value).toBe(values.email)
    expect(matriculationInput.props.value).toBe(values.matriculation)
    expect(courseInput.props.value).toBe(values.course)
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

    const emailInput = await SUT.findByTestId('register-email-input')
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

    const passwordInput = await SUT.findByTestId('register-password-input')
    fireEvent.changeText(passwordInput, values.password)

    await waitFor(() => expect(SUT.queryByText(errors.password)).toBeTruthy())
  })

  it('should call register with values after submit', async () => {
    const { SUT, registerSpy, values } = makeSUT()

    const nameInput = await SUT.findByTestId('register-name-input')
    fireEvent.changeText(nameInput, values.name)

    const emailInput = await SUT.findByTestId('register-email-input')
    fireEvent.changeText(emailInput, values.email)

    const matriculationInput = await SUT.findByTestId(
      'register-matriculation-input',
    )
    fireEvent.changeText(matriculationInput, values.matriculation)

    const courseInput = await SUT.findByTestId('register-course-input')
    fireEvent.changeText(courseInput, values.course)

    const passwordInput = await SUT.findByTestId('register-password-input')
    fireEvent.changeText(passwordInput, values.password)

    fireEvent.press(SUT.getByText('Cadastrar'))

    await waitFor(() => expect(registerSpy).toHaveBeenCalledWith(values))
  })

  it('should show toast message if register returns errors', async () => {
    const error = new BaseError(faker.random.word(), faker.random.words())

    const { SUT, registerSpy } = makeSUT()
    registerSpy.mockResolvedValueOnce(left(error))

    fireEvent.press(SUT.getByText('Cadastrar'))

    await waitFor(() => expect(SUT.getByText('Erro ao fazer cadastro.')))
    expect(SUT.getByText(error.message))
  })
})
