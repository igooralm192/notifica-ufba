import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { CreateStudentError } from '@/domain/errors'
import { mockCreateStudentInput } from '@/domain/mocks/inputs'
import { mockCreateStudentOutput } from '@/domain/mocks/outputs'
import { MockedCreateStudentUseCase } from '@/domain/mocks/usecases'

import { MockedValidation } from '@/application/mocks/validation'
import { StudentViewModel } from '@/application/models'

import faker from 'faker'

import { CreateStudentController } from '.'

const makeSUT = () => {
  const createStudentInput = mockCreateStudentInput()
  const createStudentOutput = mockCreateStudentOutput()

  const validation = new MockedValidation()
  const createStudentUseCase = new MockedCreateStudentUseCase()
  const createStudentController = new CreateStudentController(
    validation,
    createStudentUseCase,
  )

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockReturnValue(null)

  const createStudentUseCaseSpy = jest.spyOn(createStudentUseCase, 'run')
  createStudentUseCaseSpy.mockResolvedValue(right(createStudentOutput))

  return {
    SUT: createStudentController,
    validateSpy,
    createStudentUseCaseSpy,
    createStudentInput,
    createStudentOutput,
  }
}

describe('CreateStudentController', () => {
  it('should call validation correctly', async () => {
    const { SUT, validateSpy, createStudentInput } = makeSUT()

    await SUT.handle(createStudentInput)

    expect(validateSpy).toHaveBeenCalledWith(createStudentInput)
  })

  it('should call create student usecase correctly', async () => {
    const { SUT, createStudentUseCaseSpy, createStudentInput } = makeSUT()

    await SUT.handle(createStudentInput)

    expect(createStudentUseCaseSpy).toHaveBeenCalledWith(createStudentInput)
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { SUT, createStudentInput, createStudentOutput } = makeSUT()

    const response = await SUT.handle(createStudentInput)

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      student: StudentViewModel.fromDTO(createStudentOutput.student).toJSON(),
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

    const { SUT, validateSpy, createStudentInput } = makeSUT()
    validateSpy.mockReturnValueOnce(validationError)

    const response = await SUT.handle(createStudentInput)

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      code: validationError.code,
      message: validationError.message,
      context: validationError.context,
    })
  })

  it('should return 403 if student already exists', async () => {
    const createStudentError =
      new CreateStudentError.StudentAlreadyExistsError()

    const { SUT, createStudentUseCaseSpy, createStudentInput } = makeSUT()
    createStudentUseCaseSpy.mockResolvedValueOnce(left(createStudentError))

    const response = await SUT.handle(createStudentInput)

    expect(response.statusCode).toBe(403)
    expect(response.body).toMatchObject({
      code: createStudentError.code,
      message: createStudentError.message,
    })
  })
})
