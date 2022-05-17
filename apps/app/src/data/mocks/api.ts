import { IHttpApi } from '@/data/contracts'

export class MockedHttpApi implements IHttpApi {
  request(request: IHttpApi.Request): Promise<IHttpApi.Response> {
    throw new Error('Method not implemented.')
  }
}
