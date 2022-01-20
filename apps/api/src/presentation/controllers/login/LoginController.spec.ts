import { CommonError, LoginError } from '@notifica-ufba/domain/errors'
import { LoginMocks } from '@notifica-ufba/domain/mocks'
import { left, right } from '@notifica-ufba/utils'

import { UserMapper } from '@/presentation/mappers'
import { MockedValidation, MockedLoginUseCase } from '@/presentation/mocks'

import faker from 'faker'

import { LoginController } from '.'

const makeSUT = (loginResult = LoginMocks.mockLoginResult()) => {
  const loginValidation = new MockedValidation()
  const loginUseCase = new MockedLoginUseCase()
  const loginController = new LoginController(loginValidation, loginUseCase)

  const loginValidationSpy = jest.spyOn(loginValidation, 'validate')
  loginValidationSpy.mockResolvedValue(null)

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right(loginResult))

  return {
    SUT: loginController,
    loginUseCase,
    loginValidationSpy,
    loginUseCaseSpy,
  }
}

describe('LoginController', () => {
  it('should return 200 if valid credentials are provided', async () => {
    const loginParams = LoginMocks.mockLoginParams()
    const loginResult = LoginMocks.mockLoginResult()
    const { SUT, loginUseCaseSpy } = makeSUT(loginResult)

    const httpResponse = await SUT.handle(loginParams)

    expect(loginUseCaseSpy).toHaveBeenCalledWith(loginParams)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject({
      token: loginResult.token,
      user: UserMapper.toDTO(loginResult.user),
    })
  })

  it('should return 400 if validation fails', async () => {
    const loginParams = LoginMocks.mockLoginParams()
    const loginValidationError = new CommonError.ValidationError(
      faker.random.words(),
      {
        key: faker.random.word(),
        value: faker.random.word(),
      },
    )
    const { SUT, loginValidationSpy } = makeSUT()
    loginValidationSpy.mockResolvedValueOnce(loginValidationError)

    const httpResponse = await SUT.handle(loginParams)

    expect(loginValidationSpy).toHaveBeenCalledWith(loginParams)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toMatchObject(loginValidationError)
  })

  it('should return 404 if user not found', async () => {
    const loginError = new LoginError.UserDoesNotExistError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(LoginMocks.mockLoginParams())

    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toMatchObject(loginError)
  })

  it('should return 401 if password is wrong', async () => {
    const loginError = new LoginError.WrongPasswordError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(LoginMocks.mockLoginParams())

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toMatchObject(loginError)
  })
})
