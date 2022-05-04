import { CommonError } from '@notifica-ufba/domain/errors'
import {
  mockUserDTO,
  MockedAuthenticateUserUseCase,
} from '@notifica-ufba/domain/mocks'
import { left, right } from '@notifica-ufba/utils'

import { MockedAuthStore } from '@/application/mocks/stores'
import { UserViewModel } from '@/application/models'

import faker from 'faker'

import { LoginPresenter } from '.'

const makeSUT = () => {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const token = faker.datatype.uuid()
  const userDTO = mockUserDTO()

  const authStore = new MockedAuthStore()
  const authenticateUserUseCase = new MockedAuthenticateUserUseCase()
  const loginPresenter = new LoginPresenter(authStore, authenticateUserUseCase)

  const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase, 'run')
  authenticateUserUseCaseSpy.mockResolvedValue(right({ token, user: userDTO }))

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  return {
    SUT: loginPresenter,
    authenticateUserUseCaseSpy,
    setUserSpy,
    setTokenSpy,
    email,
    password,
    token,
    userDTO,
  }
}

describe('LoginPresenter', () => {
  it('should call usecase with correct params on login', async () => {
    const { SUT, authenticateUserUseCaseSpy, email, password } = makeSUT()

    await SUT.login({ email, password })

    expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call set user with correct params on login', async () => {
    const { SUT, setUserSpy, email, password, userDTO } = makeSUT()

    await SUT.login({ email, password })

    expect(setUserSpy).toHaveBeenCalledWith(UserViewModel.fromDTO(userDTO))
  })

  it('should call set token with correct params on login', async () => {
    const { SUT, setTokenSpy, email, password, token } = makeSUT()

    await SUT.login({ email, password })

    expect(setTokenSpy).toHaveBeenCalledWith(token)
  })

  it('should return on login if usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.InternalServerError(
      new Error(errorMessage),
    )

    const { SUT, authenticateUserUseCaseSpy, email, password } = makeSUT()

    authenticateUserUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    const resultOrError = await SUT.login({ email, password })
    const result = resultOrError.left()

    expect(result).toEqual(unexpectedError)
  })

  it('should show loading on init and hide loading on finish login', async () => {
    const { SUT, email, password } = makeSUT()

    const promise = SUT.login({ email, password })
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
