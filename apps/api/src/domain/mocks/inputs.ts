import { ILoginInput } from '@/domain/ports/inputs'

import faker from 'faker'

// Login

export const mockLoginInput = (): ILoginInput => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
