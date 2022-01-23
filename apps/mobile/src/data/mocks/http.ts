import { IError } from '@notifica-ufba/domain/errors'
import { Either } from '@notifica-ufba/utils'
import { IHttpClient, IHttpResponse } from '@/data/protocols'

export class MockedHttpClient implements IHttpClient {
  request(): Promise<IHttpResponse<Either<IError, any>>> {
    throw new Error('Method not implemented.')
  }
}
