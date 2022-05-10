import { CreateUserError } from '@notifica-ufba/domain/errors'
import {
  mockCreateUserInput,
  mockCreateUserOutput,
  MockedCreateUserUseCase,
} from '@notifica-ufba/domain/mocks'
import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { MockedValidation } from '@/application/mocks/validation'
import { UserViewModel } from '@/application/models'

import faker from 'faker'

import { CreateUserController } from '.'

const makeSUT = () => {
  const createUserInput = mockCreateUserInput()
  const createUserOutput = mockCreateUserOutput()

  const validation = new MockedValidation()
  const createUserUseCase = new MockedCreateUserUseCase()
  const createUserController = new CreateUserController(
    validation,
    createUserUseCase,
  )

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockReturnValue(null)

  const createUserUseCaseSpy = jest.spyOn(createUserUseCase, 'run')
  createUserUseCaseSpy.mockResolvedValue(right(createUserOutput))

  return {
    SUT: createUserController,
    validateSpy,
    createUserUseCaseSpy,
    createUserInput,
    createUserOutput,
  }
}

describe('CreateUserController', () => {
  it('should call validation correctly', async () => {
    const { SUT, validateSpy, createUserInput } = makeSUT()

    await SUT.handle({ body: createUserInput })

    expect(validateSpy).toHaveBeenCalledWith(createUserInput)
  })

  it('should call create user usecase correctly', async () => {
    const { SUT, createUserUseCaseSpy, createUserInput } = makeSUT()

    await SUT.handle({ body: createUserInput })

    expect(createUserUseCaseSpy).toHaveBeenCalledWith(createUserInput)
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { SUT, createUserInput, createUserOutput } = makeSUT()

    const response = await SUT.handle({ body: createUserInput })

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      user: UserViewModel.fromDTO(createUserOutput.user),
    })
  })

  it('should return 400 if validation fails', async () => {
    const validationError = new BaseError(
      faker.random.word(),
      faker.random.words(),
      {
        key: faker.random.word(),
        value: faker.random.word(),
      },
    )

    const { SUT, validateSpy, createUserInput } = makeSUT()
    validateSpy.mockReturnValueOnce(validationError)

    const response = await SUT.handle({ body: createUserInput })

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      code: validationError.code,
      message: validationError.message,
      context: validationError.context,
    })
  })

  it('should return 403 if user already exists', async () => {
    const createUserError = new CreateUserError.UserAlreadyExistsError()

    const { SUT, createUserUseCaseSpy, createUserInput } = makeSUT()
    createUserUseCaseSpy.mockResolvedValueOnce(left(createUserError))

    const response = await SUT.handle({ body: createUserInput })

    expect(response.statusCode).toBe(403)
    expect(response.body).toMatchObject({
      code: createUserError.code,
      message: createUserError.message,
    })
  })
})
