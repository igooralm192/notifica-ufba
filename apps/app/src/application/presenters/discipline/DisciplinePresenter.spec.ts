import { CommonError } from '@notifica-ufba/domain/errors'
import {
  MockedReadDisciplinesUseCase,
  mockReadDisciplinesOutput,
} from '@notifica-ufba/domain/mocks'
import { left, right } from '@notifica-ufba/utils'

import faker from 'faker'

import { DisciplinePresenter } from '.'

const makeSUT = () => {
  const readDisciplinesInput = {
    page: faker.datatype.number(),
    limit: faker.datatype.number(),
  }
  const readDisciplinesOutput = mockReadDisciplinesOutput()

  const readDisciplinesUseCase = new MockedReadDisciplinesUseCase()
  const disciplinePresenter = new DisciplinePresenter(readDisciplinesUseCase)

  const readDisciplinesUseCaseSpy = jest.spyOn(readDisciplinesUseCase, 'run')
  readDisciplinesUseCaseSpy.mockResolvedValue(right(readDisciplinesOutput))

  return {
    SUT: disciplinePresenter,
    readDisciplinesUseCaseSpy,
    readDisciplinesInput,
    readDisciplinesOutput,
  }
}

describe('DisciplinePresenter', () => {
  it('should call usecase with correct params', async () => {
    const { SUT, readDisciplinesUseCaseSpy, readDisciplinesInput } = makeSUT()

    await SUT.getDisciplines(readDisciplinesInput)

    const { page, limit } = readDisciplinesInput

    expect(readDisciplinesUseCaseSpy).toHaveBeenCalledWith({
      paginate: { page, limit },
    })
  })

  it('should set paginated list of disciplines on success', async () => {
    const { SUT, readDisciplinesInput, readDisciplinesOutput } = makeSUT()

    await SUT.getDisciplines(readDisciplinesInput)

    const { results, total } = readDisciplinesOutput

    expect(SUT.disciplines).toMatchObject({
      results: [
        {
          id: results[0].id,
          name: results[0].name,
          code: results[0].code,
          course: results[0].course,
          createdAt: results[0].createdAt.toLocaleDateString(),
          updatedAt: results[0].updatedAt.toLocaleDateString(),
        },
      ],
      total,
    })
  })

  it('should return on get disciplines if usecase returns some error', async () => {
    const errorMessage = faker.random.words()
    const unexpectedError = new CommonError.InternalServerError(
      new Error(errorMessage),
    )

    const { SUT, readDisciplinesUseCaseSpy, readDisciplinesInput } = makeSUT()

    readDisciplinesUseCaseSpy.mockResolvedValueOnce(left(unexpectedError))

    await SUT.getDisciplines(readDisciplinesInput)

    expect(SUT.disciplines.results).toEqual([])
  })

  it('should show loading on init and hide loading on finish discipline', async () => {
    const { SUT, readDisciplinesInput } = makeSUT()

    const promise = SUT.getDisciplines(readDisciplinesInput)
    expect(SUT.loading).toBe(true)

    await promise
    expect(SUT.loading).toBe(false)
  })
})
