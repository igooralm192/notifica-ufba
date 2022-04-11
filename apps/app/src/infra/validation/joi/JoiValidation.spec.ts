import { CommonError } from '@/domain/errors'
import faker from 'faker'
import Joi from 'joi'

import { JoiValidation } from '.'

const joiValidateSpy = jest.fn()

const makeSUT = (schema: Joi.Schema) => {
  const validation = new JoiValidation(schema)

  return {
    SUT: validation,
  }
}

describe('JoiValidation', () => {
  it('should receive ValidationError when validation fails', () => {
    const fieldKey = faker.random.word()
    const errorMessage = faker.random.words()

    const { SUT } = makeSUT(
      Joi.object({
        [fieldKey]: Joi.string().required().messages({
          'any.required': errorMessage,
        }),
      }),
    )

    const error = SUT.validate(fieldKey, undefined)

    expect(error).toBeInstanceOf(CommonError.ValidationError)

    expect(error).toMatchObject({
      message: errorMessage,
      context: {
        key: fieldKey,
      },
    })
  })

  it('should receive null when validation pass', async () => {
    const fieldKey = faker.random.word()
    const fieldValue = faker.random.words()

    const { SUT } = makeSUT(
      Joi.object({
        [fieldKey]: Joi.string().required(),
      }),
    )

    const error = SUT.validate(fieldKey, fieldValue)

    expect(error).toBeNull()
  })
})
