import { Controller } from '@/application/controllers/Controller'

import { Request, Response } from 'express'

export class ExpressRouteAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response) => {
      const controllerResponse = await controller.perform(request.body)

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body)
    }
  }
}
