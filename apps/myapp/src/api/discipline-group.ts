import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import {
  IReadLastMessagesUseCase,
  ISubscribeStudentToDisciplineGroupUseCase,
} from '@notifica-ufba/domain/usecases'

import { LastMessageMapper } from '@/mappers'
import { api } from '@/services/api'

export const getMyLastMessages = async ({
  page,
  limit,
}: IPaginateListInputDTO): Promise<IReadLastMessagesUseCase.Output> => {
  const response = await api.get('/discipline-groups/last-messages', {
    params: {
      page,
      limit,
    },
  })

  return {
    results: LastMessageMapper.toDTOList(response.data.results),
    total: response.data.total,
  }
}

export const subscribeStudent = async ({
  disciplineGroupId,
  studentId,
}: ISubscribeStudentToDisciplineGroupUseCase.Input): Promise<ISubscribeStudentToDisciplineGroupUseCase.Output> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/subscribe`, {
    studentId,
  })
}
