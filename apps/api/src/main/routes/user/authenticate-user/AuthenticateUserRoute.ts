import { ExpressRouteAdapter } from '@/main/adapters'
import { makeAuthenticateUserController } from '@/main/factories/controllers'

import { Router } from 'express'

const { adapt } = ExpressRouteAdapter

export const makeAuthenticateUserRoute = (router: Router) => {
  router.post('/auth/user', adapt(makeAuthenticateUserController()))
}
