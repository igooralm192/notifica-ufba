import makeLogin from '@/main/routes/login'

import { Express, Router } from 'express'

export const setupRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeLogin(router)
}
