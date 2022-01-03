import { HttpRequest } from '@/data/protocols'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => {
  return {
    url: faker.internet.url(),
    method: faker.helpers.randomize(['post']),
    body: faker.random.objectElement(),
    headers: faker.random.objectElement(),
  }
}
