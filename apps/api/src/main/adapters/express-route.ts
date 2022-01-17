import { BaseController } from '@/presentation/helpers'

import { Request, Response } from 'express'

export class ExpressRouteAdapter {
  static adapt(controller: BaseController) {
    return async (request: Request, response: Response) => {
      const httpResponse = await controller.perform(request.body)

      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
