import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, right } from '@notifica-ufba/utils'

import {
  ICountDisciplineRepository,
  IDisciplineRepositoryListInput,
  IFindAllDisciplineRepository,
} from '@/data/contracts'

export class ReadDisciplinesUseCase implements IReadDisciplinesUseCase {
  constructor(
    private readonly findAllDisciplineRepository: IFindAllDisciplineRepository,
    private readonly countDisciplineRepository: ICountDisciplineRepository,
  ) {}

  async run(
    input: IReadDisciplinesUseCase.Input = {},
  ): Promise<Either<BaseError, IReadDisciplinesUseCase.Output>> {
    const { paginate } = input

    const listInput: IDisciplineRepositoryListInput = {
      skip: paginate?.page,
      take: paginate?.limit,
      include: {
        groups: {
          include: {
            teacher: { include: { user: true } },
          },
        },
      },
    }

    const [disciplines, totalDisciplines] = await Promise.all([
      this.findAllDisciplineRepository.findAll(listInput),
      this.countDisciplineRepository.count(),
    ])

    return right({
      results: disciplines,
      total: totalDisciplines,
    })
  }
}
