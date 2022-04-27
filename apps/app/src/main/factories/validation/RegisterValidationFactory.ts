import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeRegisterValidation = () => {
  return new JoiValidation(
    Joi.object({
      name: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'any.required': `Campo obrigatório.`,
          'string.empty': 'Campo obrigatório.',
          'string.email': `E-mail inválido.`,
        }),
      matriculation: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      course: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      password: Joi.string().min(6).required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
        'string.min': `Senha precisa ter no mínimo 6 caracteres.`,
      }),
      confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'As senhas não conferem.' }),
    }),
  )
}
