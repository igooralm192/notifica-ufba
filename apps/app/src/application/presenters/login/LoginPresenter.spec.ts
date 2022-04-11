import { CommonError } from '@/domain/errors'
import { MockedValidation } from '@/domain/mocks/validation'
import { MockedLoginUseCase } from '@/domain/mocks/usecases'

import faker from 'faker'

import { LoginPresenter } from '.'

const makeSUT = () => {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const validation = new MockedValidation()
  const loginUseCase = new MockedLoginUseCase()
  const presenter = new LoginPresenter(validation, loginUseCase)

  const validateSpy = jest.spyOn(validation, 'validate')
  validateSpy.mockImplementation()

  return {
    SUT: presenter,
    validateSpy,
    email,
    password,
  }
}

describe('LoginPresenter', () => {
  it('should call validate with correct params and update state', () => {
    const { SUT, validateSpy, email, password } = makeSUT()

    SUT.validate('email', email)
    SUT.validate('password', password)

    expect(validateSpy).toHaveBeenCalledWith('email', email)
    expect(validateSpy).toHaveBeenCalledWith('password', password)

    expect(SUT.state.form).toMatchObject({
      values: { email, password },
      errors: {},
    })
  })

  it('should update form errors state with error message if validation returns error', () => {
    const errorMessage = faker.random.words()
    const { SUT, validateSpy, email, password } = makeSUT()

    validateSpy.mockReturnValue(new CommonError.ValidationError(errorMessage))

    SUT.validate('email', email)
    SUT.validate('password', password)

    expect(SUT.state.form).toMatchObject({
      values: { email, password },
      errors: { email: errorMessage, password: errorMessage },
    })
  })
})
