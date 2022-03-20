import Joi from 'joi'

import { JoiValidation } from '.'

export class LoginJoiValidation extends JoiValidation {
  constructor() {
    super(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    )
  }
}
