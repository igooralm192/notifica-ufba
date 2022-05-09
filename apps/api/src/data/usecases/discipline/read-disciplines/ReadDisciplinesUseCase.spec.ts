import { mockDisciplineEntity } from '@notifica-ufba/domain/mocks'

import { MockedDisciplineRepository } from '@/data/mocks/repositories'
import { DisciplineModel } from '@/data/models'

import { ReadDisciplinesUseCase } from '.'

const makeSUT = () => {
  const discipline = mockDisciplineEntity()

  const disciplineRepository = new MockedDisciplineRepository()
  const readDisciplinesUseCase = new ReadDisciplinesUseCase(
    disciplineRepository,
    disciplineRepository,
  )

  const findAllSpy = jest.spyOn(disciplineRepository, 'findAll')
  findAllSpy.mockResolvedValue([discipline])

  const countSpy = jest.spyOn(disciplineRepository, 'count')
  countSpy.mockResolvedValue(1)

  return {
    SUT: readDisciplinesUseCase,
    findAllSpy,
    countSpy,
    discipline,
  }
}

describe('ReadDisciplinesUseCase', () => {
  it('should call findAll repository correctly', async () => {
    const { SUT, findAllSpy } = makeSUT()

    const paginateListInput = {
      page: 1,
      limit: 2,
    }

    await SUT.run({ paginate: paginateListInput })

    expect(findAllSpy).toHaveBeenCalledWith({
      take: paginateListInput.page,
      skip: paginateListInput.limit,
    })
  })

  it('should call count repository correctly', async () => {
    const { SUT, countSpy } = makeSUT()

    await SUT.run()

    expect(countSpy).toHaveBeenCalled()
  })

  it('should be able to read all disciplines', async () => {
    const { SUT, discipline } = makeSUT()

    const resultOrError = await SUT.run()
    const result = resultOrError.right()

    expect(result).toMatchObject({
      disciplines: [DisciplineModel.fromEntity(discipline).toDTO()],
      total: 1,
    })
  })
})
