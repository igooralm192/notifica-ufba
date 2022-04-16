import { left, right } from '@notifica-ufba/utils'

import { CommonError } from '@/domain/errors'
import { mockUser } from '@/domain/mocks/entities'
import { MockedValidation } from '@/domain/mocks/validation'
import { MockedLoginUseCase } from '@/domain/mocks/usecases'
import { MockedAuthStore } from '@/application/mocks/stores'

import faker from 'faker'

import { LoginPresenter } from '.'

const makeSUT = () => {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const user = mockUser()

  const authStore = new MockedAuthStore()
  const validation = new MockedValidation()
  const loginUseCase = new MockedLoginUseCase()
  const presenter = new LoginPresenter(authStore, validation, loginUseCase)

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockImplementation()

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right({ user }))

  return {
    SUT: presenter,
    setUserSpy,
    validateSpy,
    loginUseCaseSpy,
    email,
    password,
    user,
  }
}

describe('LoginPresenter', () => {
  it('should call dependencies with correct params on validate and update state', () => {
    const { SUT, validateSpy, email, password } = makeSUT()

    SUT.validate('email', email)
    SUT.validate('password', password)

    expect(validateSpy).toHaveBeenCalledWith('email', email)
    expect(validateSpy).toHaveBeenCalledWith('password', password)

    expect(SUT).toMatchObject({
      values: { email, password },
      errors: {},
    })
  })

  it('should update form errors state with error message if validation returns error', () => {
    const errorMessage = faker.random.words()
    const { SUT, validateSpy, email, password } = makeSUT()

    validateSpy.mockReturnValue(new CommonError.ValidationError(errorMessage))

    SUT.validate('email', email)
    SUT.validate('password', password)

    expect(SUT).toMatchObject({
      values: { email, password },
      errors: { email: errorMessage, password: errorMessage },
    })
  })

  it('should call dependencies with correct params on login and set current user', async () => {
    const {
      SUT,
      setUserSpy,
      validateSpy,
      loginUseCaseSpy,
      email,
      password,
      user,
    } = makeSUT()

    await SUT.login(email, password)

    expect(validateSpy).toHaveBeenCalledWith('email', email)
    expect(validateSpy).toHaveBeenCalledWith('password', password)
    expect(loginUseCaseSpy).toHaveBeenCalledWith({ email, password })
    expect(setUserSpy).toHaveBeenCalledWith(user)
  })

  it('should break if validation returns some error', async () => {
    const errorMessage = faker.random.words()
    const { SUT, validateSpy, loginUseCaseSpy, email, password } = makeSUT()

    validateSpy.mockReturnValueOnce(
      new CommonError.ValidationError(errorMessage),
    )

    await SUT.login(email, password)

    expect(loginUseCaseSpy).not.toHaveBeenCalled()
  })

  it('should set error on login failure', async () => {
    const { SUT, loginUseCaseSpy, email, password } = makeSUT()

    loginUseCaseSpy.mockResolvedValueOnce(
      left(new CommonError.UnexpectedError()),
    )

    await SUT.login(email, password)

    expect(SUT.error).toBe(new CommonError.UnexpectedError().message)
  })
})
