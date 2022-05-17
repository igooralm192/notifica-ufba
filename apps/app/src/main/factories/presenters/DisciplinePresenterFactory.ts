import { DisciplinePresenter } from '@/application/presenters'
import { IDisciplinePresenter } from '@/ui/presenters'
import { makeReadDisciplinesUseCase } from '@/main/factories/usecases'

export const makeDisciplinePresenter = (): IDisciplinePresenter => {
  const readDisciplinesUseCase = makeReadDisciplinesUseCase()

  return new DisciplinePresenter(readDisciplinesUseCase)
}
