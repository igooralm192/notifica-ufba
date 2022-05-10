import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import {
  mockReadDisciplinesOutput,
  MockedReadDisciplinesUseCase,
} from '@notifica-ufba/domain/mocks'
import { right } from '@notifica-ufba/utils'

import { DisciplineViewModel } from '@/application/models'
import { MockedListParamsParser } from '@/application/mocks/parsers'

import { ReadDisciplinesController } from '.'

const makeSUT = () => {
  const paginateListInput: IPaginateListInputDTO = { page: 1, limit: 2 }
  const controllerRequest = {
    query: {
      page: String(paginateListInput.page),
      limit: String(paginateListInput.limit),
    },
  }
  const readDisciplinesOutput = mockReadDisciplinesOutput()

  const listParamsParser = new MockedListParamsParser()
  const readDisciplinesUseCase = new MockedReadDisciplinesUseCase()
  const readDisciplinesController = new ReadDisciplinesController(
    listParamsParser,
    readDisciplinesUseCase,
  )

  const readDisciplinesUseCaseSpy = jest.spyOn(readDisciplinesUseCase, 'run')
  readDisciplinesUseCaseSpy.mockResolvedValue(right(readDisciplinesOutput))

  const parseSpy = jest.spyOn(listParamsParser, 'parse')
  parseSpy.mockReturnValue({ paginate: paginateListInput })

  return {
    SUT: readDisciplinesController,
    parseSpy,
    readDisciplinesUseCaseSpy,
    paginateListInput,
    controllerRequest,
    readDisciplinesOutput,
  }
}

describe('ReadDisciplinesController', () => {
  it('should call listParams parser correctly', async () => {
    const { SUT, parseSpy, controllerRequest } = makeSUT()

    await SUT.handle(controllerRequest)

    expect(parseSpy).toHaveBeenCalledWith(controllerRequest.query)
  })
  it('should call readDisciplines usecase correctly', async () => {
    const {
      SUT,
      readDisciplinesUseCaseSpy,
      paginateListInput,
      controllerRequest,
    } = makeSUT()

    await SUT.handle(controllerRequest)

    expect(readDisciplinesUseCaseSpy).toHaveBeenCalledWith({
      paginate: paginateListInput,
    })
  })

  it('should return 200 on list disciplines', async () => {
    const { SUT, readDisciplinesOutput, controllerRequest } = makeSUT()

    const response = await SUT.handle(controllerRequest)

    const { disciplines, total } = readDisciplinesOutput

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      results: disciplines.map(discipline =>
        DisciplineViewModel.fromDTO(discipline),
      ),
      total,
    })
  })
})
