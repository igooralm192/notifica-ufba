import { BaseError } from '@/shared/errors'
import { InvalidEmailError, RequiredValueError } from '@/validation/errors'
import { IValidator } from '@/validation/protocols'

import faker from 'faker'

import { EmailValidator } from '.'

class MockedEmailValidator implements IValidator {
  validate(): BaseError {
    throw new Error('Method not implemented.')
  }
}

const makeSUT = () => {
  const field = faker.random.word()
  const value = faker.random.word()

  const emailValidator = new MockedEmailValidator()
  const validator = new EmailValidator(emailValidator)

  const validateEmailSpy = jest.spyOn(emailValidator, 'validate')
  validateEmailSpy.mockReturnValue(null)

  return {
    SUT: validator,
    validateEmailSpy,
    field,
    value,
  }
}

describe('EmailValidator', () => {
  it('should call email validator adapter with correct params', () => {
    const { SUT, validateEmailSpy, field, value } = makeSUT()

    SUT.validate(field, value)

    expect(validateEmailSpy).toHaveBeenCalledWith(field, value)
  })

  it('should return error if email validator adapter returns error', () => {
    const { SUT, field, value } = makeSUT()

    const error = SUT.validate(field, value)

    expect(error).toBeInstanceOf(InvalidEmailError)
  })

  it('should return null if email validator adapter pass', () => {
    const { SUT, field, value } = makeSUT()

    const error = SUT.validate(field, value)

    expect(error).toBeNull()
  })
})
