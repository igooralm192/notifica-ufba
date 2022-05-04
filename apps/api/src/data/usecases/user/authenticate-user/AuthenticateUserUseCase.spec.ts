import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import {
  mockUserEntity,
  mockAuthenticateUserInput,
} from '@notifica-ufba/domain/mocks'

import {
  MockedHashCryptography,
  MockedTokenCryptography,
} from '@/data/mocks/cryptography'
import { MockedUserRepository } from '@/data/mocks/repositories'
import { UserModel } from '@/data/models'

import faker from 'faker'

import { AuthenticateUserUseCase } from '.'

const makeSUT = () => {
  const authenticateUserInput = mockAuthenticateUserInput()
  const token = faker.datatype.uuid()
  const user = mockUserEntity()

  const userRepository = new MockedUserRepository()
  const hashCryptography = new MockedHashCryptography()
  const tokenCryptography = new MockedTokenCryptography()
  const loginUseCase = new AuthenticateUserUseCase(
    userRepository,
    hashCryptography,
    tokenCryptography,
  )

  const findOneSpy = jest.spyOn(userRepository, 'findOne')
  findOneSpy.mockResolvedValue(user)

  const compareHashSpy = jest.spyOn(hashCryptography, 'compare')
  compareHashSpy.mockResolvedValue(true)

  const generateTokenSpy = jest.spyOn(tokenCryptography, 'generate')
  generateTokenSpy.mockResolvedValue(token)

  return {
    SUT: loginUseCase,
    findOneSpy,
    compareHashSpy,
    generateTokenSpy,
    authenticateUserInput,
    token,
    user,
  }
}

describe('AuthenticateUserUseCase', () => {
  it('should be able to authenticate with email and password and get an access token and user info', async () => {
    const { SUT, generateTokenSpy, authenticateUserInput, token, user } =
      makeSUT()

    const resultOrError = await SUT.run(authenticateUserInput)
    const result = resultOrError.right()

    expect(generateTokenSpy).toHaveBeenCalledWith({
      payload: { id: user.id },
    })

    expect(result).toMatchObject({
      token,
      user: UserModel.fromEntity(user).toDTO(),
    })
  })

  it('should not be able to authenticate if user does not exist', async () => {
    const { SUT, findOneSpy, authenticateUserInput } = makeSUT()

    findOneSpy.mockResolvedValueOnce(undefined)

    const resultOrError = await SUT.run(authenticateUserInput)
    const error = resultOrError.left()

    expect(findOneSpy).toHaveBeenCalledWith({
      email: authenticateUserInput.email,
    })
    expect(error).toBeInstanceOf(AuthenticateUserError.UserDoesNotExistError)
  })

  it('should not be able to authenticate if password is wrong', async () => {
    const { SUT, compareHashSpy, authenticateUserInput } = makeSUT()

    compareHashSpy.mockResolvedValueOnce(false)

    const resultOrError = await SUT.run(authenticateUserInput)
    const error = resultOrError.left()

    expect(compareHashSpy).toHaveBeenCalledWith(
      expect.objectContaining({ payload: authenticateUserInput.password }),
    )
    expect(error).toBeInstanceOf(AuthenticateUserError.WrongPasswordError)
  })
})
