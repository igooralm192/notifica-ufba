import { IPostMessageUseCase } from '@notifica-ufba/domain/usecases'
import { PostMessageUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupMessageRepository,
  makeDisciplineGroupRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeMessagingService } from '@/main/factories/services'

export const makePostMessageUseCase = (): IPostMessageUseCase => {
  const userRepository = makeUserRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const disciplineGroupMessageRepository =
    makeDisciplineGroupMessageRepository()
  const messagingService = makeMessagingService()

  return new PostMessageUseCase(
    userRepository,
    disciplineGroupRepository,
    disciplineGroupMessageRepository,
    messagingService,
  )
}
