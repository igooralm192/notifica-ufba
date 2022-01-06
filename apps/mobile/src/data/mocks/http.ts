import { IError } from '@notifica-ufba/domain/errors'
import { Either } from '@notifica-ufba/utils'
import { IHttpClient, IHttpRequest, IHttpResponse } from '@/data/protocols'

import faker from 'faker'

export const mockHttpRequest = (): IHttpRequest => {
  return {
    url: faker.internet.url(),
    method: faker.helpers.randomize(['post']),
    body: faker.random.objectElement(),
    headers: faker.random.objectElement(),
  }
}

export class MockedHttpClient implements IHttpClient {
  request(): Promise<IHttpResponse<Either<IError, any>>> {
    throw new Error('Method not implemented.')
  }
}
