import { SubscribeStudentToDisciplineGroupController } from '@/application/controllers/discipline-group'
import { makeSubscribeStudentToDisciplineGroupUseCase } from '@/main/factories/usecases'
import { makeSubscribeStudentToDisciplineGroupValidation } from '@/main/factories/validation'

export const makeSubscribeStudentToDisciplineGroupController = () => {
  const subscribeStudentToDisciplineGroupValidation =
    makeSubscribeStudentToDisciplineGroupValidation()
  const subscribeStudentToDisciplineGroupUseCase =
    makeSubscribeStudentToDisciplineGroupUseCase()

  return new SubscribeStudentToDisciplineGroupController(
    subscribeStudentToDisciplineGroupValidation,
    subscribeStudentToDisciplineGroupUseCase,
  )
}
