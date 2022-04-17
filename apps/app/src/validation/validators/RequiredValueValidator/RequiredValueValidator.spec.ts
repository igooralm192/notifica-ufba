import { RequiredValueError } from '@/validation/errors'

import faker from 'faker'

import { RequiredValueValidator } from '.'

describe('RequiredValueValidator', () => {
  it('should return error if value is undefined', () => {
    const validator = new RequiredValueValidator()

    const error = validator.validate(faker.random.word(), undefined)

    expect(error).toBeInstanceOf(RequiredValueError)
  })

  it('should return null if value is defined', () => {
    const validator = new RequiredValueValidator()

    const error = validator.validate(faker.random.word(), faker.random.word())

    expect(error).toBeNull()
  })
})
