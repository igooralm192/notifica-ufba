import { CommonError } from '@notifica-ufba/domain/errors'
import { LoginPresenter } from '@/presentation/presenters/login'
import { IValidation } from '@/presentation/protocols'

import faker from 'faker'

class MockedValidation implements IValidation {
  validate(input: any): Promise<CommonError.ValidationError> {
    throw new Error('Method not implemented.')
  }
}

describe('LoginPresenter', () => {
  it('should call Validation with correct params', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const validation = new MockedValidation()
    const presenter = new LoginPresenter(validation)

    const validate = jest.spyOn(validation, 'validate')
    validate.mockImplementation()

    presenter.validateField('email', email)
    expect(validate).toHaveBeenCalledWith(expect.objectContaining({ email }))

    presenter.validateField('password', password)
    expect(validate).toHaveBeenCalledWith(expect.objectContaining({ password }))
  })

  it('should update errors object if email validation return error', async () => {
    const email = 'invalid_email'
    const validation = new MockedValidation()
    const presenter = new LoginPresenter(validation)

    const validate = jest.spyOn(validation, 'validate')
    validate.mockImplementationOnce(async () => {
      return {
        type: faker.random.word(),
        message: faker.random.words(),
      }
    })

    await presenter.validateField('email', email)

    expect(presenter.state).toMatchObject({
      values: {
        email,
      },
      errors: {
        email: expect.any(String),
      },
    })
  })

  it('should update errors object if password validation return error', async () => {
    const password = 'invalid_password'
    const validation = new MockedValidation()
    const presenter = new LoginPresenter(validation)

    const validate = jest.spyOn(validation, 'validate')
    validate.mockImplementationOnce(async () => {
      return {
        type: faker.random.word(),
        message: faker.random.words(),
      }
    })

    await presenter.validateField('password', password)

    expect(presenter.state).toMatchObject({
      values: {
        password,
      },
      errors: {
        password: expect.any(String),
      },
    })
  })
})
