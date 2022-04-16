import { ILoginInput } from '@/domain/ports/inputs'

import faker from 'faker'

export const mockLoginInput = (): ILoginInput => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
