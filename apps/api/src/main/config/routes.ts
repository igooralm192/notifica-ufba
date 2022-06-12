import { makeReadDisciplinesRoute } from '@/main/routes/discipline'
import {
  makePostMessageRoute,
  makeReadDisciplineGroupsRoute,
  makeReadLastMessagesRoute,
  makeSubscribeStudentToDisciplineGroupRoute,
} from '@/main/routes/discipline-group'
import { makeCreateStudentRoute } from '@/main/routes/student'
import {
  makeAuthenticateUserRoute,
  makeGetMyUserRoute,
} from '@/main/routes/user'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeAuthenticateUserRoute(router)
  makeCreateStudentRoute(router)
  makeGetMyUserRoute(router)
  makePostMessageRoute(router)
  makeReadDisciplineGroupsRoute(router)
  makeReadDisciplinesRoute(router)
  makeReadLastMessagesRoute(router)
  makeSubscribeStudentToDisciplineGroupRoute(router)
}
