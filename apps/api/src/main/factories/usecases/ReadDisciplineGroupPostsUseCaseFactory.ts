import { IReadDisciplineGroupPostsUseCase } from '@notifica-ufba/domain/usecases'
import { ReadDisciplineGroupPostsUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupPostRepository,
  makeDisciplineGroupRepository,
} from '@/main/factories/repositories'

export const makeReadDisciplineGroupPostsUseCase =
  (): IReadDisciplineGroupPostsUseCase => {
    const disciplineGroupRepository = makeDisciplineGroupRepository()
    const disciplineGroupPostRepository = makeDisciplineGroupPostRepository()

    return new ReadDisciplineGroupPostsUseCase(
      disciplineGroupRepository,
      disciplineGroupPostRepository,
    )
  }
