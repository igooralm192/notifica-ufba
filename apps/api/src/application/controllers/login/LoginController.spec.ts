import { left, right } from '@notifica-ufba/utils'

import { mockLoginOutput } from '@/domain/mocks/outputs'
import { MockedLoginUseCase } from '@/application/mocks/usecases'

import faker from 'faker'

import { LoginController } from '.'
import { mockLoginInput } from '@/domain/mocks/inputs'
import { CommonError, LoginError } from '@/domain/errors'

const makeSUT = (loginOutput = mockLoginOutput()) => {
  const loginUseCase = new MockedLoginUseCase()
  const loginController = new LoginController(loginUseCase)

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right(loginOutput))

  return {
    SUT: loginController,
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
    const loginValidationError = new CommonError.ValidationError(
      faker.random.words(),
      {
        key: faker.random.word(),
        value: faker.random.word(),
      },
    )
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginValidationError))

    const response = await SUT.handle(loginInput)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject(loginValidationError)
  })

  it('should return 404 if user not found', async () => {
    const loginError = new LoginError.UserDoesNotExistError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const response = await SUT.handle(mockLoginInput())

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject(loginError)
  })

  it('should return 401 if password is wrong', async () => {
    const loginError = new LoginError.WrongPasswordError()
    const { SUT, loginUseCaseSpy } = makeSUT()
    loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

    const httpResponse = await SUT.handle(mockLoginInput())

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toMatchObject(loginError)
  })
})
