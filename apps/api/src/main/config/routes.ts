import { makeReadDisciplinesRoute } from '@/main/routes/discipline'
import { makeSubscribeStudentToDisciplineGroupRoute } from '@/main/routes/discipline-group'
import { makeCreateStudentRoute } from '@/main/routes/student'
import { makeAuthenticateUserRoute } from '@/main/routes/user'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeAuthenticateUserRoute(router)
  makeCreateStudentRoute(router)
  makeReadDisciplinesRoute(router)
  makeSubscribeStudentToDisciplineGroupRoute(router)
}
