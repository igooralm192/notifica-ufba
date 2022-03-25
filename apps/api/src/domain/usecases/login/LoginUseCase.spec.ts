import { CommonError, LoginError } from '@/domain/errors'
import { mockUser } from '@/domain/mocks/entities'
import { mockLoginInput } from '@/domain/mocks/inputs'
import {
  MockedHashCryptography,
  MockedTokenCryptography,
} from '@/domain/mocks/gateways'
import { MockedUserRepository } from '@/domain/mocks/repositories'

import faker from 'faker'
import { LoginUseCase } from '.'
import { MockedValidation } from '@/domain/mocks/validation'

const makeSUT = (user = mockUser(), token = faker.datatype.uuid()) => {
  const loginValidation = new MockedValidation()
  const userRepository = new MockedUserRepository()
  const hashCryptography = new MockedHashCryptography()
  const tokenCryptography = new MockedTokenCryptography()
  const loginUseCase = new LoginUseCase(
    loginValidation,
    userRepository,
    hashCryptography,
    tokenCryptography,
  )

  const validateSpy = jest.spyOn(loginValidation, 'validate')
  validateSpy.mockResolvedValue(null)

  const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail')
  findByEmailSpy.mockResolvedValue(user)

  const compareHashSpy = jest.spyOn(hashCryptography, 'compare')
  compareHashSpy.mockResolvedValue(true)

  const generateTokenSpy = jest.spyOn(tokenCryptography, 'generate')
  generateTokenSpy.mockResolvedValue(token)

  return {
    SUT: loginUseCase,
    validateSpy,
    findByEmailSpy,
    compareHashSpy,
    generateTokenSpy,
  }
}

describe('LoginUseCase', () => {
  it('should be able to login with email and password and get an access token and user info', async () => {
    const user = mockUser()
    const token = faker.datatype.uuid()

    const { SUT, generateTokenSpy } = makeSUT(user, token)

    const resultOrError = await SUT.run(mockLoginInput())
    const result = resultOrError.right()

    expect(generateTokenSpy).toHaveBeenCalledWith({
      payload: { id: user.id },
    })

    expect(result).toMatchObject({
      token,
      user: expect.objectContaining({ ...user, password: undefined }),
    })
  })

  it('should not be able to login if validation returns error', async () => {
    const loginInput = mockLoginInput()
    const { SUT, validateSpy } = makeSUT()
    validateSpy.mockResolvedValueOnce(
      new CommonError.ValidationError('any_message'),
    )

    const resultOrError = await SUT.run(loginInput)
    const error = resultOrError.left()

    expect(validateSpy).toHaveBeenCalledWith(loginInput)
    expect(error).toBeInstanceOf(CommonError.ValidationError)
  })

  it('should not be able to login if user does not exist', async () => {
    const loginInput = mockLoginInput()
    const { SUT, findByEmailSpy } = makeSUT()
    findByEmailSpy.mockResolvedValueOnce(undefined)

    const resultOrError = await SUT.run(loginInput)
    const error = resultOrError.left()

    expect(findByEmailSpy).toHaveBeenCalledWith(loginInput.email)
    expect(error).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })

  it('should not be able to login if password is wrong', async () => {
    const loginInput = mockLoginInput()
    const { SUT, compareHashSpy } = makeSUT()
    compareHashSpy.mockResolvedValueOnce(false)

    const resultOrError = await SUT.run(loginInput)
    const error = resultOrError.left()

    expect(compareHashSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: loginInput.password,
      }),
    )
    expect(error).toBeInstanceOf(LoginError.WrongPasswordError)
  })
})
