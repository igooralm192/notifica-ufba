import { left, right } from '@notifica-ufba/utils'

import { CommonError } from '@/domain/errors'
import { mockUserDTO } from '@/domain/mocks/dtos'
import { MockedLoginUseCase } from '@/domain/mocks/usecases'

import { MockedAuthStore } from '@/application/mocks/stores'
import { MockedValidation } from '@/application/mocks/validation'
import { UserViewModel } from '@/application/models'

import faker from 'faker'

import { LoginPresenter } from '.'

const makeSUT = () => {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const token = faker.datatype.uuid()
  const userDTO = mockUserDTO()

  const authStore = new MockedAuthStore()
  const validation = new MockedValidation()
  const loginUseCase = new MockedLoginUseCase()
  const presenter = new LoginPresenter(authStore, validation, loginUseCase)

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockImplementation()

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right({ token, user: userDTO }))

  return {
    SUT: presenter,
    setUserSpy,
    validateSpy,
    loginUseCaseSpy,
    email,
    password,
    token,
    userDTO,
  }
}

describe('LoginPresenter', () => {
  it('should call validate with correct params and update state', () => {
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

    validateSpy.mockReturnValueOnce(
      new CommonError.ValidationError(errorMessage),
    )

    SUT.validate('email', email)

    validateSpy.mockReturnValueOnce(
      new CommonError.ValidationError(errorMessage),
    )
    SUT.validate('password', password)

    expect(SUT).toMatchObject({
      values: { email, password },
      errors: { email: errorMessage, password: errorMessage },
    })
  })

  it('should call validate with correct params on submit', async () => {
    const { SUT, validateSpy, email, password } = makeSUT()

    await SUT.submit({ email, password })

    expect(validateSpy).toHaveBeenCalledWith('email', email)
    expect(validateSpy).toHaveBeenCalledWith('password', password)
  })

  it('should call login usecase with correct params on submit if validation pass', async () => {
    const { SUT, loginUseCaseSpy, email, password } = makeSUT()

    await SUT.submit({ email, password })

    expect(loginUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call set user with correct params on submit if usecase pass', async () => {
    const { SUT, setUserSpy, email, password, userDTO } = makeSUT()

    await SUT.submit({ email, password })

    expect(setUserSpy).toHaveBeenCalledWith(UserViewModel.fromDTO(userDTO))
  })

  it('should return on submit if validation returns some error', async () => {
    const errorMessage = faker.random.words()
    const validationError = new CommonError.ValidationError(errorMessage)

    const { SUT, validateSpy, loginUseCaseSpy, email, password } = makeSUT()

    validateSpy.mockReturnValueOnce(validationError)

    const resultOrError = await SUT.submit({ email, password })
    const result = resultOrError.left()

    expect(loginUseCaseSpy).not.toHaveBeenCalled()
    expect(result).toEqual(validationError)
  })

  it('should return on submit if usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.UnexpectedError(
      new Error(errorMessage),
    )

    const { SUT, loginUseCaseSpy, email, password } = makeSUT()

    loginUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    const resultOrError = await SUT.submit({ email, password })
    const result = resultOrError.left()

    expect(result).toEqual(unexpectedError)
  })

  it('should show loading on init and hide loading on finish submit', async () => {
    const { SUT, email, password } = makeSUT()

    const promise = SUT.submit({ email, password })
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
