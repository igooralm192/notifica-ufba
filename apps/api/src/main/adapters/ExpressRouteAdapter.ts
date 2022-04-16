import { BaseController } from '@/application/helpers'

import { Request, Response } from 'express'

export class ExpressRouteAdapter {
  static adapt(controller: BaseController) {
    return async (request: Request, response: Response) => {
      const controllerResponse = await controller.perform(request.body)

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body)
    }
  }
}
