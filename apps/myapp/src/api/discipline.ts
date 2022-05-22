import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'
import { DisciplineMapper } from '@/mappers'
import { api } from '@/services/api'

export const getDisciplines = async ({
  paginate,
}: IReadDisciplinesUseCase.Input): Promise<IReadDisciplinesUseCase.Output> => {
  const response = await api.get('/disciplines', {
    params: {
      page: paginate?.page,
      limit: paginate?.limit,
    },
  })

  const { results, total } = response.data

  return {
    results: DisciplineMapper.toEntityList(results),
    total,
  }
}
