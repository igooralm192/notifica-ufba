import {
  IHttpClient,
  IHttpRequest,
  IHttpResponse,
} from '@/domain/ports/gateways'

export class MockedHttpClient implements IHttpClient {
  request(_: IHttpRequest): Promise<IHttpResponse> {
    throw new Error('Method not implemented.')
  }
}
