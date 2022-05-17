import { ReadDisciplinesUseCase } from '@/data/usecases/discipline'
import { makeHttpApi } from '@/main/factories/api'
import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'

export const makeReadDisciplinesUseCase = (): IReadDisciplinesUseCase => {
  const httpApi = makeHttpApi()

  return new ReadDisciplinesUseCase(httpApi)
}
