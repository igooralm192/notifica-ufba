import { Presentation } from '@/domain/ports/presentations/Presentation'
import { Response } from 'express'

export class ExpressResponseAdapter {
  constructor(
    private readonly presentation: Presentation,
    private readonly response: Response,
  ) {}

  build() {
    return this.response
      .status(this.presentation.statusCode)
      .json(this.presentation.data)
  }
}
