import { left, right } from '@notifica-ufba/utils'

import { mockLoginOutput } from '@/domain/mocks/outputs'
import { MockedLoginUseCase } from '@/application/mocks/usecases'

import faker from 'faker'

import { LoginController } from '.'
import { MockedLoginPresenter } from '@/application/mocks/presenters'
import { mockLoginViewModel } from '@/application/mocks/models'
import { mockLoginInput } from '@/domain/mocks/inputs'
import { ILoginViewModel } from '@/application/models/login'

const makeSUT = (
  loginOutput = mockLoginOutput(),
  loginViewModel = mockLoginViewModel(),
) => {
  const loginUseCase = new MockedLoginUseCase()
  const loginPresenter = new MockedLoginPresenter()
  const loginController = new LoginController(loginUseCase, loginPresenter)

  const loginUseCaseSpy = jest.spyOn(loginUseCase, 'run')
  loginUseCaseSpy.mockResolvedValue(right(loginOutput))

  const loginPresenterSpy = jest.spyOn(loginPresenter, 'format')
  loginPresenterSpy.mockReturnValue(loginViewModel)

  return {
    SUT: loginController,
    loginUseCase,
    loginUseCaseSpy,
    loginPresenterSpy,
  }
}

describe('LoginController', () => {
  it('should return 200 if valid credentials are provided', async () => {
    const loginInput = mockLoginInput()
    const loginOutput = mockLoginOutput()

    const { SUT, loginUseCaseSpy, loginPresenterSpy } = makeSUT(loginOutput)

    const httpResponse = await SUT.handle(loginInput)

    expect(loginUseCaseSpy).toHaveBeenCalledWith(loginInput)
    expect(loginPresenterSpy).toHaveBeenCalledWith(loginOutput)
    expect(httpResponse.statusCode).toBe(200)
  })

  // it('should return 400 if validation fails', async () => {
  //   const loginInput = mockLoginInput()
  //   const loginValidationError = new CommonError.ValidationError(
  //     faker.random.words(),
  //     {
  //       key: faker.random.word(),
  //       value: faker.random.word(),
  //     },
  //   )
  //   const { SUT, loginValidationSpy } = makeSUT()
  //   loginValidationSpy.mockResolvedValueOnce(loginValidationError)

  //   const httpResponse = await SUT.handle(loginInput)

  //   expect(loginValidationSpy).toHaveBeenCalledWith(loginInput)
  //   expect(httpResponse.statusCode).toBe(400)
  //   expect(httpResponse.body).toMatchObject(loginValidationError)
  // })

  // it('should return 404 if user not found', async () => {
  //   const loginError = new LoginError.UserDoesNotExistError()
  //   const { SUT, loginUseCaseSpy } = makeSUT()
  //   loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

  //   const httpResponse = await SUT.handle(mockLoginInput())

  //   expect(httpResponse.statusCode).toBe(404)
  //   expect(httpResponse.body).toMatchObject(loginError)
  // })

  // it('should return 401 if password is wrong', async () => {
  //   const loginError = new LoginError.WrongPasswordError()
  //   const { SUT, loginUseCaseSpy } = makeSUT()
  //   loginUseCaseSpy.mockResolvedValueOnce(left(loginError))

  //   const httpResponse = await SUT.handle(mockLoginInput())

  //   expect(httpResponse.statusCode).toBe(401)
  //   expect(httpResponse.body).toMatchObject(loginError)
  // })
})
