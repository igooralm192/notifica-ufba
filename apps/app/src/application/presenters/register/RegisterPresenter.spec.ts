import { left, right } from '@notifica-ufba/utils'

import {
  MockedCreateStudentUseCase,
  MockedAuthenticateUserUseCase,
  mockCreateStudentInput,
  mockCreateStudentOutput,
  mockAuthenticateUserOutput,
} from '@notifica-ufba/domain/mocks'

import { MockedAuthStore } from '@/application/mocks/stores'

import faker from 'faker'

import { RegisterPresenter } from '.'
import { MockedAlertManager } from '@/application/mocks/managers'
import { BaseError } from '@notifica-ufba/errors'

const makeSUT = () => {
  const createStudentInput = mockCreateStudentInput()
  const createStudentOutput = mockCreateStudentOutput()
  const authenticateUserOutput = mockAuthenticateUserOutput(
    createStudentOutput.student.user,
  )

  const authStore = new MockedAuthStore()
  const alertManager = new MockedAlertManager()
  const createStudentUseCase = new MockedCreateStudentUseCase()
  const authenticateUserUseCase = new MockedAuthenticateUserUseCase()

  const registerPresenter = new RegisterPresenter(
    authStore,
    alertManager,
    createStudentUseCase,
    authenticateUserUseCase,
  )

  const createStudentUseCaseSpy = jest.spyOn(createStudentUseCase, 'run')
  createStudentUseCaseSpy.mockResolvedValue(right(createStudentOutput))

  const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase, 'run')
  authenticateUserUseCaseSpy.mockResolvedValue(right(authenticateUserOutput))

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  const showAlertSpy = jest.spyOn(alertManager, 'show')
  showAlertSpy.mockImplementation()

  return {
    SUT: registerPresenter,
    createStudentUseCaseSpy,
    authenticateUserUseCaseSpy,
    setUserSpy,
    setTokenSpy,
    showAlertSpy,
    createStudentInput,
    createStudentOutput,
    authenticateUserOutput,
  }
}

describe('RegisterPresenter', () => {
  it('should call CreateStudentUseCase with correct params on register', async () => {
    const {
      SUT,
      createStudentUseCaseSpy,
      authenticateUserUseCaseSpy,
      createStudentInput,
    } = makeSUT()

    await SUT.register(createStudentInput)

    const { email, password } = createStudentInput

    expect(createStudentUseCaseSpy).toHaveBeenCalledWith(createStudentInput)
    expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call AuthenticateUserUseCase with correct params on register', async () => {
    const {
      SUT,
      createStudentUseCaseSpy,
      authenticateUserUseCaseSpy,
      createStudentInput,
    } = makeSUT()

    await SUT.register(createStudentInput)

    const { email, password } = createStudentInput

    expect(createStudentUseCaseSpy).toHaveBeenCalledWith(createStudentInput)
    expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call set user with correct params on register', async () => {
    const { SUT, setUserSpy, createStudentInput, authenticateUserOutput } =
      makeSUT()

    await SUT.register(createStudentInput)

    const { user } = authenticateUserOutput

    expect(setUserSpy).toHaveBeenCalledWith({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
    })
  })

  it('should call set token with correct params on register', async () => {
    const { SUT, setTokenSpy, createStudentInput, authenticateUserOutput } =
      makeSUT()

    await SUT.register(createStudentInput)

    const { token } = authenticateUserOutput

    expect(setTokenSpy).toHaveBeenCalledWith(token)
  })

  it('should show alert if CreateStudentUseCase returns some error', async () => {
    const error = new BaseError(faker.random.word(), faker.random.words())

    const { SUT, createStudentUseCaseSpy, showAlertSpy, createStudentInput } =
      makeSUT()

    createStudentUseCaseSpy.mockResolvedValueOnce(left(error))

    await SUT.register(createStudentInput)

    expect(showAlertSpy).toHaveBeenCalledWith({
      type: 'error',
      title: 'Erro ao fazer cadastro.',
      message: error.message,
    })
  })

  it('should return on register if authenticateUser usecase returns some error', async () => {
    const error = new BaseError(faker.random.word(), faker.random.words())

    const {
      SUT,
      authenticateUserUseCaseSpy,
      showAlertSpy,
      createStudentInput,
    } = makeSUT()

    authenticateUserUseCaseSpy.mockResolvedValueOnce(left(error))

    await SUT.register(createStudentInput)

    expect(showAlertSpy).toHaveBeenCalledWith({
      type: 'error',
      title: 'Erro ao fazer cadastro.',
      message: error.message,
    })
  })

  it('should show loading on init and hide loading on finish register', async () => {
    const { SUT, createStudentInput } = makeSUT()

    const promise = SUT.register(createStudentInput)
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
