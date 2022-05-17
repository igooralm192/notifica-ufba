import { CommonError } from '@notifica-ufba/domain/errors'

import { MockedHttpApi } from '@/data/mocks/api'

import faker from 'faker'

import { ReadDisciplinesUseCase } from '.'

const mockReadDisciplinesHttpResponse = () => {
  return {
    results: [
      {
        id: faker.datatype.uuid(),
        name: faker.name.title(),
        code: faker.random.word(),
        course: faker.name.jobTitle(),
        createdAt: faker.datatype.datetime().toISOString(),
        updatedAt: faker.datatype.datetime().toISOString(),
      },
    ],
    total: 1,
  }
}

const makeSUT = () => {
  const readDisciplinesInput = { paginate: { page: 1, limit: 2 } }
  const readDisciplinesHttpResponse = mockReadDisciplinesHttpResponse()

  const httpApi = new MockedHttpApi()
  const readDisciplinesUseCase = new ReadDisciplinesUseCase(httpApi)

  const httpRequestSpy = jest.spyOn(httpApi, 'request')
  httpRequestSpy.mockResolvedValue({
    statusCode: 200,
    body: readDisciplinesHttpResponse,
  })

  return {
    SUT: readDisciplinesUseCase,
    httpRequestSpy,
    readDisciplinesInput,
    readDisciplinesHttpResponse,
  }
}

describe('ReadDisciplinesUseCase', () => {
  it('should call http request with correct params', async () => {
    const { SUT, httpRequestSpy, readDisciplinesInput } = makeSUT()

    await SUT.run(readDisciplinesInput)

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/disciplines',
      method: 'get',
      params: {
        page: readDisciplinesInput.paginate.page,
        limit: readDisciplinesInput.paginate.limit,
      },
    })
  })

  it('should return http response body on statusCode 200', async () => {
    const { SUT, readDisciplinesInput, readDisciplinesHttpResponse } = makeSUT()

    const resultOrError = await SUT.run(readDisciplinesInput)
    const result = resultOrError.right()

    const { results, total } = readDisciplinesHttpResponse

    expect(result).toMatchObject({
      results: [
        {
          id: results[0].id,
          name: results[0].name,
          code: results[0].code,
          course: results[0].course,
          createdAt: new Date(results[0].createdAt),
          updatedAt: new Date(results[0].updatedAt),
        },
      ],
      total,
    })
  })
  it('should return InternalServerError error on another statusCode', async () => {
    const { SUT, httpRequestSpy, readDisciplinesInput } = makeSUT()

    httpRequestSpy.mockResolvedValueOnce({
      statusCode: 500,
    })

    const resultOrError = await SUT.run(readDisciplinesInput)
    const result = resultOrError.left()

    expect(result).toBeInstanceOf(CommonError.InternalServerError)
  })
})
