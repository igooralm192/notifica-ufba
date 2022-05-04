import { left, right } from '@notifica-ufba/utils'

import {
  mockStudentDTO,
  mockUserDTO,
  MockedCreateStudentUseCase,
  MockedAuthenticateUserUseCase,
  mockCreateStudentInput,
} from '@notifica-ufba/domain/mocks'
import { CommonError } from '@notifica-ufba/domain/errors'

import { MockedAuthStore } from '@/application/mocks/stores'
import { UserViewModel } from '@/application/models'

import faker from 'faker'

import { RegisterPresenter } from '.'

const makeSUT = () => {
  const createStudentInput = mockCreateStudentInput()
  const token = faker.datatype.uuid()
  const userDTO = mockUserDTO()
  const studentDTO = mockStudentDTO(userDTO)

  const authStore = new MockedAuthStore()
  const createStudentUseCase = new MockedCreateStudentUseCase()
  const authenticateUserUseCase = new MockedAuthenticateUserUseCase()

  const registerPresenter = new RegisterPresenter(
    authStore,
    createStudentUseCase,
    authenticateUserUseCase,
  )

  const createStudentUseCaseSpy = jest.spyOn(createStudentUseCase, 'run')
  createStudentUseCaseSpy.mockResolvedValue(right({ student: studentDTO }))

  const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase, 'run')
  authenticateUserUseCaseSpy.mockResolvedValue(right({ token, user: userDTO }))

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  return {
    SUT: registerPresenter,
    createStudentUseCaseSpy,
    authenticateUserUseCaseSpy,
    setUserSpy,
    setTokenSpy,
    createStudentInput,
    token,
    userDTO,
    studentDTO,
  }
}

describe('RegisterPresenter', () => {
  it('should call create student usecase with correct params on register', async () => {
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

  it('should call authenticateUser usecase with correct params on register', async () => {
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
    const { SUT, setUserSpy, createStudentInput, userDTO } = makeSUT()

    await SUT.register(createStudentInput)

    expect(setUserSpy).toHaveBeenCalledWith(UserViewModel.fromDTO(userDTO))
  })

  it('should call set token with correct params on register', async () => {
    const { SUT, setTokenSpy, createStudentInput, token } = makeSUT()

    await SUT.register(createStudentInput)

    expect(setTokenSpy).toHaveBeenCalledWith(token)
  })

  it('should return on register if create student usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.InternalServerError(
      new Error(errorMessage),
    )

    const { SUT, createStudentUseCaseSpy, createStudentInput } = makeSUT()

    createStudentUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    const resultOrError = await SUT.register(createStudentInput)
    const result = resultOrError.left()

    expect(result).toEqual(unexpectedError)
  })

  it('should return on register if authenticateUser usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.InternalServerError(
      new Error(errorMessage),
    )

    const { SUT, authenticateUserUseCaseSpy, createStudentInput } = makeSUT()

    authenticateUserUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    const resultOrError = await SUT.register(createStudentInput)
    const result = resultOrError.left()

    expect(result).toEqual(unexpectedError)
  })

  it('should show loading on init and hide loading on finish register', async () => {
    const { SUT, createStudentInput } = makeSUT()

    const promise = SUT.register(createStudentInput)
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
