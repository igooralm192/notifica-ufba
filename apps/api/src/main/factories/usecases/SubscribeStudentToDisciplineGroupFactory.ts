import { SubscribeStudentToDisciplineGroupUseCase } from '@/data/usecases/discipline'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
} from '@/main/factories/repositories'

export const makeSubscribeStudentToDisciplineGroupUseCase = () => {
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const studentRepository = makeStudentRepository()

  return new SubscribeStudentToDisciplineGroupUseCase(
    disciplineGroupRepository,
    studentRepository,
    disciplineGroupRepository,
  )
}
