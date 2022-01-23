import { LoginHttpRequest, LoginHttpResponse } from '@/data/usecases/login'

import faker from 'faker'

export const mockLoginHttpRequest = (): LoginHttpRequest => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const mockLoginHttpResponse = (): LoginHttpResponse => {
  return {
    token: faker.datatype.uuid(),
    user: {
      id: faker.datatype.number(),
      name: faker.random.word(),
      email: faker.internet.email(),
      created_at: faker.datatype.datetime().toISOString(),
      updated_at: faker.datatype.datetime().toISOString(),
    },
  }
}
