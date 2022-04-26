import { left, right } from '@notifica-ufba/utils'

import { CommonError } from '@/domain/errors'
import { mockUserDTO } from '@/domain/mocks/dtos'
import { MockedLoginUseCase } from '@/domain/mocks/usecases'

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
  const loginUseCase = new MockedLoginUseCase()
  const presenter = new LoginPresenter(authStore, loginUseCase)

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right({ token, user: userDTO }))

  return {
    SUT: presenter,
    setUserSpy,
    loginUseCaseSpy,
    email,
    password,
    token,
    userDTO,
  }
}

describe('LoginPresenter', () => {
  it('should call usecase with correct params on login', async () => {
    const { SUT, loginUseCaseSpy, email, password } = makeSUT()

    await SUT.login({ email, password })

    expect(loginUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call set user with correct params on login', async () => {
    const { SUT, setUserSpy, email, password, userDTO } = makeSUT()

    await SUT.login({ email, password })

    expect(setUserSpy).toHaveBeenCalledWith(UserViewModel.fromDTO(userDTO))
  })

  it('should return on login if usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.UnexpectedError(
      new Error(errorMessage),
    )

    const { SUT, loginUseCaseSpy, email, password } = makeSUT()

    loginUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

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
