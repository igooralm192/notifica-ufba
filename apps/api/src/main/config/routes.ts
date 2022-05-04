import { makeCreateStudentRoute } from '@/main/routes/student'
import { makeAuthenticateUserRoute } from '@/main/routes/user'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeCreateStudentRoute(router)
  makeAuthenticateUserRoute(router)
}
