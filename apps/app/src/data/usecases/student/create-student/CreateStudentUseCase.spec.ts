import { CommonError, CreateStudentError } from '@notifica-ufba/domain/errors'
import { mockCreateStudentInput } from '@notifica-ufba/domain/mocks'

import { MockedHttpApi } from '@/data/mocks/api'
import { StudentModel } from '@/data/models'

import faker from 'faker'

import { CreateStudentUseCase } from '.'

const mockCreateStudentHttpResponse = () => {
  return {
    student: {
      id: faker.datatype.uuid(),
      matriculation: faker.datatype.uuid(),
      course: faker.company.companyName(),
      user: {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        type: 'STUDENT',
        created_at: faker.datatype.datetime().toISOString(),
        updated_at: faker.datatype.datetime().toISOString(),
      },
      user_id: faker.datatype.uuid(),
      created_at: faker.datatype.datetime().toISOString(),
      updated_at: faker.datatype.datetime().toISOString(),
    },
  }
}

const makeSUT = () => {
  const createStudentInput = mockCreateStudentInput()
  const createStudentHttpResponse = mockCreateStudentHttpResponse()

  const httpApi = new MockedHttpApi()
  const createStudentUseCase = new CreateStudentUseCase(httpApi)

  const httpRequestSpy = jest.spyOn(httpApi, 'request')
  httpRequestSpy.mockResolvedValue({
    statusCode: 200,
    body: createStudentHttpResponse,
  })

  return {
    SUT: createStudentUseCase,
    httpRequestSpy,
    createStudentInput,
    createStudentHttpResponse,
  }
}

describe('CreateStudentUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, createStudentInput, httpRequestSpy } = makeSUT()

    await SUT.run(createStudentInput)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/students',
      method: 'post',
      body: createStudentInput,
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, createStudentInput, createStudentHttpResponse } = makeSUT()

    const resultOrError = await SUT.run(createStudentInput)
    const result = resultOrError.right()

    expect(result).toMatchObject({
      student: StudentModel.fromJSON(createStudentHttpResponse.student).toDTO(),
    })
  })

  it('should return StudentAlreadyNotExists error on statusCode 403', async () => {
    const { SUT, createStudentInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 403,
      body: {
        code: 'StudentAlreadyExistsError',
        message: faker.random.words(),
      },
    })

    const resultOrError = await SUT.run(createStudentInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CreateStudentError.StudentAlreadyExistsError)
  })

  it('should return InternalServerError error on another statusCode', async () => {
    const { SUT, createStudentInput, httpRequestSpy } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 500,
    })

    const resultOrError = await SUT.run(createStudentInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CommonError.InternalServerError)
  })
})
