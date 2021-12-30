import { LoginErrors } from '@notifica-ufba/domain/errors'
import { left, right } from '@notifica-ufba/utils'

import { mockLoginParams, mockLoginResult } from '@/data/mocks'
import { FakeValidation, FakeLoginUseCase } from '@/presentation/mocks'
import { InternalServerError, ValidationError } from '@/presentation/errors'

import faker from 'faker'

import { LoginController } from '.'

const makeSUT = (loginResult = mockLoginResult()) => {
  const loginValidation = new FakeValidation()
  const loginUseCase = new FakeLoginUseCase()
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
    const loginParams = mockLoginParams()
    const loginResult = mockLoginResult()
    const { SUT, loginUseCaseSpy } = makeSUT(loginResult)

    const httpResponse = await SUT.handle(loginParams)

    expect(loginUseCaseSpy).toHaveBeenCalledWith(loginParams)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toMatchObject(loginResult)
  })

  it('should return 400 if validation fails', async () => {
    const loginParams = mockLoginParams()
    const loginValidationError = new ValidationError(faker.random.words(), {
      key: faker.random.word(),
      value: faker.random.word(),
    })
    const { SUT, loginValidationSpy } = makeSUT()
    loginValidationSpy.mockResolvedValueOnce(loginValidationError)

    const httpResponse = await SUT.handle(loginParams)

    expect(loginValidationSpy).toHaveBeenCalledWith(loginParams)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toMatchObject(
      loginValidationError.getControllerErrorResponse(),
    )
  })

  it('should return 404 if user not found', async () => {
    const loginError = new LoginErrors.UserDoesNotExistError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(mockLoginParams())

    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toMatchObject({
      type: loginError.name,
      message: loginError.message,
    })
  })

  it('should return 401 if password is wrong', async () => {
    const loginError = new LoginErrors.WrongPasswordError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(mockLoginParams())

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toMatchObject({
      type: loginError.name,
      message: loginError.message,
    })
  })

  it('should return 500 if unexpected error is returned', async () => {
    const loginError = new InternalServerError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(mockLoginParams())

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toMatchObject({
      type: loginError.name,
      message: loginError.message,
    })
  })
})
