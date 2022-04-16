import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { LoginError } from '@/domain/errors'
import { mockLoginInput } from '@/domain/mocks/inputs'
import { mockLoginOutput } from '@/domain/mocks/outputs'

import { MockedLoginUseCase } from '@/application/mocks/usecases'
import { MockedValidation } from '@/application/mocks/validation'

import faker from 'faker'

import { LoginController } from '.'

const makeSUT = (loginOutput = mockLoginOutput()) => {
  const validation = new MockedValidation()
  const loginUseCase = new MockedLoginUseCase()
  const loginController = new LoginController(validation, loginUseCase)

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockReturnValue(null)

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right(loginOutput))

  return {
    SUT: loginController,
    validateSpy,
    loginUseCaseSpy,
  }
}

describe('LoginController', () => {
  it('should return 200 if valid credentials are provided', async () => {
    const loginInput = mockLoginInput()
    const loginOutput = mockLoginOutput()

    const { SUT, loginUseCaseSpy } = makeSUT(loginOutput)

    const response = await SUT.handle(loginInput)

    expect(loginUseCaseSpy).toHaveBeenCalledWith(loginInput)
    expect(response.statusCode).toBe(200)
  })

  it('should return 400 if validation fails', async () => {
    const loginInput = mockLoginInput()
    const validationError = new BaseError(
      faker.random.word(),
      faker.random.words(),
      {
        key: faker.random.word(),
        value: faker.random.word(),
      },
    )

    const { SUT, validateSpy } = makeSUT()
    validateSpy.mockReturnValueOnce(validationError)

    const response = await SUT.handle(loginInput)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      code: validationError.code,
      message: validationError.message,
      context: validationError.context,
    })
  })

  it('should return 404 if user not found', async () => {
    const loginError = new LoginError.UserDoesNotExistError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const response = await SUT.handle(mockLoginInput())

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      code: loginError.code,
      message: loginError.message,
    })
  })

  it('should return 401 if password is wrong', async () => {
    const loginError = new LoginError.WrongPasswordError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(mockLoginInput())

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toMatchObject({
      code: loginError.code,
      message: loginError.message,
    })
  })
})
