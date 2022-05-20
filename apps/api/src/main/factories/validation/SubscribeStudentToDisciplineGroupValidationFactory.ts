import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeSubscribeStudentToDisciplineGroupValidation = () => {
  return new JoiValidation(
    Joi.object({
      studentId: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
