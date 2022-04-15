import { makeLoginRoutes } from '@/main/routes/login'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeLoginRoutes(router)
}
