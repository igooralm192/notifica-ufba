import { left, right } from '@notifica-ufba/utils'

import { mockStudentDTO, mockUserDTO } from '@/domain/mocks/dtos'
import { CommonError } from '@/domain/errors'
import { mockCreateStudentInput } from '@/domain/mocks/inputs'
import {
  MockedCreateStudentUseCase,
  MockedLoginUseCase,
} from '@/domain/mocks/usecases'

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
  const loginUseCase = new MockedLoginUseCase()

  const presenter = new RegisterPresenter(
    authStore,
    createStudentUseCase,
    loginUseCase,
  )

  const createStudentUseCaseSpy = jest.spyOn(createStudentUseCase, 'run')
  createStudentUseCaseSpy.mockResolvedValue(right({ student: studentDTO }))

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right({ token, user: userDTO }))

  const setUserSpy = jest.spyOn(authStore, 'setUser')
  setUserSpy.mockImplementation()

  const setTokenSpy = jest.spyOn(authStore, 'setToken')
  setTokenSpy.mockImplementation()

  return {
    SUT: presenter,
    createStudentUseCaseSpy,
    loginUseCaseSpy,
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
      loginUseCaseSpy,
      createStudentInput,
    } = makeSUT()

    await SUT.register(createStudentInput)

    const { email, password } = createStudentInput

    expect(createStudentUseCaseSpy).toHaveBeenCalledWith(createStudentInput)
    expect(loginUseCaseSpy).toHaveBeenCalledWith({ email, password })
  })

  it('should call login usecase with correct params on register', async () => {
    const {
      SUT,
      createStudentUseCaseSpy,
      loginUseCaseSpy,
      createStudentInput,
    } = makeSUT()

    await SUT.register(createStudentInput)

    const { email, password } = createStudentInput

    expect(createStudentUseCaseSpy).toHaveBeenCalledWith(createStudentInput)
    expect(loginUseCaseSpy).toHaveBeenCalledWith({ email, password })
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
    const unexpectedError = new CommonError.UnexpectedError(
      new Error(errorMessage),
    )

    const { SUT, createStudentUseCaseSpy, createStudentInput } = makeSUT()

    createStudentUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    const resultOrError = await SUT.register(createStudentInput)
    const result = resultOrError.left()

    expect(result).toEqual(unexpectedError)
  })

  it('should return on register if login usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.UnexpectedError(
      new Error(errorMessage),
    )

    const { SUT, loginUseCaseSpy, createStudentInput } = makeSUT()

    loginUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

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
