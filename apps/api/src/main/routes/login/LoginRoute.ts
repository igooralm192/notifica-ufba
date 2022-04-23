import { ExpressRouteAdapter } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers'

import { Router } from 'express'

const { adapt } = ExpressRouteAdapter

export const makeLoginRoutes = (router: Router) => {
  router.post('/login', adapt(makeLoginController()))
}
