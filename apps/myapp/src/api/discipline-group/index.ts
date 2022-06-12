import { DisciplineGroupMapper, LastMessageMapper } from '@/mappers'
import { api } from '@/services/api'
import {
  IGetDisciplineGroupsEndpoint,
  IGetMyLastMessagesEndpoint,
  ISubscribeStudentEndpoint,
} from './types'

export const getDisciplineGroups = async ({
  query,
  page,
  limit,
}: IGetDisciplineGroupsEndpoint.Request): Promise<IGetDisciplineGroupsEndpoint.Response> => {
  const response = await api.get('/discipline-groups', {
    params: {
      studentIds_has: query?.studentId || undefined,
      page,
      limit,
    },
  })

  return {
    results: DisciplineGroupMapper.toEntityList(response.data.results),
    total: response.data.total,
  }
}

export const getMyLastMessages = async ({
  page,
  limit,
}: IGetMyLastMessagesEndpoint.Request): Promise<IGetMyLastMessagesEndpoint.Response> => {
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
}: ISubscribeStudentEndpoint.Request): Promise<void> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/subscribe`, {
    studentId,
  })
}
