import {
  IHttpApi,
  IHttpApiRequest,
  IHttpApiResponse,
} from '@/domain/ports/gateways'

export class MockedHttpApi implements IHttpApi {
  request(_: IHttpApiRequest): Promise<IHttpApiResponse> {
    throw new Error('Method not implemented.')
  }
}
