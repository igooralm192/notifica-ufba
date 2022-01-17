import { LoginError } from '@notifica-ufba/domain/errors'
import { UserMocks, LoginMocks } from '@notifica-ufba/domain/mocks'

import {
  MockedHashCryptography,
  MockedTokenCryptography,
  MockedUserRepository,
} from '@/data/mocks'

import faker from 'faker'
import { LoginUseCase } from './index'

const makeSUT = (
  user = UserMocks.mockUser(),
  token = faker.datatype.uuid(),
) => {
  const userRepository = new MockedUserRepository()
  const hashCryptography = new MockedHashCryptography()
  const tokenCryptography = new MockedTokenCryptography()
  const loginUseCase = new LoginUseCase(
    userRepository,
    hashCryptography,
    tokenCryptography,
  )

  const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail')
  findByEmailSpy.mockResolvedValue(user)

  const compareHashSpy = jest.spyOn(hashCryptography, 'compare')
  compareHashSpy.mockResolvedValue(true)

  const generateTokenSpy = jest.spyOn(tokenCryptography, 'generate')
  generateTokenSpy.mockResolvedValue(token)

  return {
    SUT: loginUseCase,
    findByEmailSpy,
    compareHashSpy,
    generateTokenSpy,
  }
}

describe('LoginUseCase', () => {
  it('should be able to login with email and password and get an access token and user info', async () => {
    const { user, token } = LoginMocks.mockLoginResult().right()
    const { SUT, generateTokenSpy } = makeSUT(user, token)

    const resultOrError = await SUT.run(LoginMocks.mockLoginParams())
    const result = resultOrError.right()

    expect(generateTokenSpy).toHaveBeenCalledWith({
      payload: { id: user.id },
    })

    expect(result).toMatchObject({
      token,
      user,
    })
  })

  it('should not be able to login if user does not exist', async () => {
    const loginParams = LoginMocks.mockLoginParams()
    const { SUT, findByEmailSpy } = makeSUT()
    findByEmailSpy.mockResolvedValueOnce(undefined)

    const resultOrError = await SUT.run(loginParams)
    const error = resultOrError.left()

    expect(findByEmailSpy).toHaveBeenCalledWith(loginParams.email)
    expect(error).toBeInstanceOf(LoginError.UserDoesNotExistError)
  })

  it('should not be able to login if password is wrong', async () => {
    const loginParams = LoginMocks.mockLoginParams()
    const { SUT, compareHashSpy } = makeSUT()
    compareHashSpy.mockResolvedValueOnce(false)

    const resultOrError = await SUT.run(loginParams)
    const error = resultOrError.left()

    expect(compareHashSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: loginParams.password,
      }),
    )
    expect(error).toBeInstanceOf(LoginError.WrongPasswordError)
  })
})
