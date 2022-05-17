import {
  MockedAuthenticateUserUseCase,
  mockAuthenticateUserOutput,
  mockAuthenticateUserInput,
} from '@notifica-ufba/domain/mocks'
import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { MockedAlertManager } from '@/application/mocks/managers'
import { MockedAuthStore } from '@/application/mocks/stores'

import faker from 'faker'

import { LoginPresenter } from '.'

const makeSUT = () => {
  const authenticateUserInput = mockAuthenticateUserInput()
  const authenticateUserOutput = mockAuthenticateUserOutput()

  const authStore = new MockedAuthStore()
  const alertManager = new MockedAlertManager()
  const authenticateUserUseCase = new MockedAuthenticateUserUseCase()
  const loginPresenter = new LoginPresenter(
    authStore,
    alertManager,
    authenticateUserUseCase,
  )

  const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase, 'run')
  authenticateUserUseCaseSpy.mockResolvedValue(right(authenticateUserOutput))

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  const showAlertSpy = jest.spyOn(alertManager, 'show')
  showAlertSpy.mockImplementation()

  return {
    SUT: loginPresenter,
    authenticateUserUseCaseSpy,
    setUserSpy,
    setTokenSpy,
    showAlertSpy,
    authenticateUserInput,
    authenticateUserOutput,
  }
}

describe('LoginPresenter', () => {
  it('should call usecase with correct params on login', async () => {
    const { SUT, authenticateUserUseCaseSpy, authenticateUserInput } = makeSUT()

    await SUT.login(authenticateUserInput)

    expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith(
      authenticateUserInput,
    )
  })

  it('should call set user with correct params on login', async () => {
    const { SUT, setUserSpy, authenticateUserInput, authenticateUserOutput } =
      makeSUT()

    await SUT.login(authenticateUserInput)

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

  it('should call set token with correct params on login', async () => {
    const { SUT, setTokenSpy, authenticateUserInput, authenticateUserOutput } =
      makeSUT()

    await SUT.login(authenticateUserInput)

    const { token } = authenticateUserOutput

    expect(setTokenSpy).toHaveBeenCalledWith(token)
  })

  it('should show alert if usecase returns some error', async () => {
    const error = new BaseError(faker.random.word(), faker.random.words())

    const {
      SUT,
      authenticateUserUseCaseSpy,
      showAlertSpy,
      authenticateUserInput,
    } = makeSUT()

    authenticateUserUseCaseSpy.mockResolvedValueOnce(left(error))

    await SUT.login(authenticateUserInput)

    expect(showAlertSpy).toHaveBeenCalledWith({
      type: 'error',
      title: 'Erro ao fazer login.',
      message: error.message,
    })
  })

  it('should show loading on init and hide loading on finish login', async () => {
    const { SUT, authenticateUserInput } = makeSUT()

    const promise = SUT.login(authenticateUserInput)
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
