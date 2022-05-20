import { ExpressRouteAdapter } from '@/main/adapters'
import { makeSubscribeStudentToDisciplineGroupController } from '@/main/factories/controllers'

import { Router } from 'express'

const { adapt } = ExpressRouteAdapter

export const makeSubscribeStudentToDisciplineGroupRoute = (router: Router) => {
  router.post(
    '/discipline-groups/:disciplineGroupId/subscribe',
    adapt(makeSubscribeStudentToDisciplineGroupController()),
  )
}
