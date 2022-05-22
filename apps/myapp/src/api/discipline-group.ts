import { ISubscribeStudentToDisciplineGroupUseCase } from '@notifica-ufba/domain/usecases'
import { api } from '@/services/api'

export const subscribeStudent = async ({
  disciplineGroupId,
  studentId,
}: ISubscribeStudentToDisciplineGroupUseCase.Input): Promise<ISubscribeStudentToDisciplineGroupUseCase.Output> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/subscribe`, {
    studentId,
  })
}
