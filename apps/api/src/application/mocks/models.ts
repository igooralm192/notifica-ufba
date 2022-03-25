import { ILoginViewModel } from '@/application/models/login'

import faker from 'faker'

export const mockLoginViewModel = (): ILoginViewModel => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: faker.datatype.number(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      created_at: faker.datatype.datetime().toISOString(),
      updated_at: faker.datatype.datetime().toISOString(),
    },
  }
}
