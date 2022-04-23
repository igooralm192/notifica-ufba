import { CreateUserError } from '@/domain/errors'
import { mockUser } from '@/domain/mocks/entities'
import { MockedHashCryptography } from '@/domain/mocks/gateways'
import { mockCreateUserInput } from '@/domain/mocks/inputs'
import { MockedUserRepository } from '@/domain/mocks/repositories'

import faker from 'faker'

import { CreateUserUseCase } from './CreateUserUseCase'

const makeSUT = () => {
  const createUserInput = mockCreateUserInput()
  const hashedPassword = faker.internet.password()
  const user = mockUser()

  const userRepository = new MockedUserRepository()
  const hashCryptography = new MockedHashCryptography()
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    hashCryptography,
    userRepository,
  )

  const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail')
  findByEmailSpy.mockResolvedValue(undefined)

  const generateHashSpy = jest.spyOn(hashCryptography, 'generate')
  generateHashSpy.mockResolvedValue(hashedPassword)

  const createUserSpy = jest.spyOn(userRepository, 'create')
  createUserSpy.mockResolvedValue(user)

  return {
    SUT: createUserUseCase,
    findByEmailSpy,
    generateHashSpy,
    createUserSpy,
    createUserInput,
    hashedPassword,
    user,
  }
}

describe('CreateUserUseCase', () => {
  it('should create a user and get an access token and user info', async () => {
    const { SUT, createUserInput, user } = makeSUT()

    const resultOrError = await SUT.run(createUserInput)
    const result = resultOrError.right()

    expect(result).toMatchObject({ user })
  })

  it('should call hash dependency to generate hashed password', async () => {
    const { SUT, generateHashSpy, createUserInput } = makeSUT()

    await SUT.run(createUserInput)

    expect(generateHashSpy).toHaveBeenCalledWith({
      payload: createUserInput.password,
    })
  })

  it('should call generate hash password with param password as payload', async () => {
    const { SUT, generateHashSpy, createUserInput } = makeSUT()

    await SUT.run(createUserInput)

    expect(generateHashSpy).toHaveBeenCalledWith({
      payload: createUserInput.password,
    })
  })

  it('should call create user repository with user params and hashed password', async () => {
    const { SUT, createUserSpy, createUserInput, hashedPassword } = makeSUT()

    await SUT.run(createUserInput)

    expect(createUserSpy).toHaveBeenCalledWith({
      ...createUserInput,
      password: hashedPassword,
    })
  })

  it('should return error if user already exists', async () => {
    const { SUT, findByEmailSpy, createUserInput } = makeSUT()

    findByEmailSpy.mockResolvedValueOnce(mockUser())

    const resultOrError = await SUT.run(createUserInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CreateUserError.UserAlreadyExistsError)
  })
})
