import faker from 'faker'
import Joi from 'joi'

import { JoiValidation } from '.'

const joiValidateSpy = jest.fn()

jest.mock('joi', () => {
  return {
    object: jest.fn().mockImplementation(() => ({
      validateAsync: joiValidateSpy,
    })),
  }
})

const makeSUT = () => {
  const validation = new JoiValidation(Joi.object())

  return {
    SUT: validation,
  }
}

describe('JoiValidation', () => {
  it('should receive correct controller error response when validation fails', async () => {
    const errorKey = faker.random.word()
    const errorValue = faker.random.word()
    const errorMessage = faker.random.words()

    const { SUT } = makeSUT()

    joiValidateSpy.mockImplementationOnce(() => {
      const error = {
        details: [
          {
            message: errorMessage,
            context: {
              key: errorKey,
              value: errorValue,
            },
          },
        ],
      }

      throw error
    })

    const error = await SUT.validate({})

    expect(error.getControllerErrorResponse()).toMatchObject({
      type: expect.any(String),
      message: errorMessage,
      context: {
        key: errorKey,
        value: errorValue,
      },
    })
  })

  it('should receive null when validation pass', async () => {
    const { SUT } = makeSUT()

    const error = await SUT.validate({})

    expect(error).toBeNull()
  })
})
