import { makeCreateStudentRoute, makeLoginRoute } from '@/main/routes'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeCreateStudentRoute(router)
  makeLoginRoute(router)
}
