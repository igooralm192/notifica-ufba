import { LoginUseCase as UseCase } from '@notifica-ufba/domain/usecases'
import { Either, right } from '@notifica-ufba/utils'

import { mockLoginParams, mockLoginResult } from '@/data/mocks'
import { HttpClient, HttpResponse } from '@/data/protocols'

class FakeHttpClient implements HttpClient {
  request(): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}

class LoginUseCase implements UseCase {
  constructor(
    private readonly httpClient: HttpClient<UseCase.Params, UseCase.Result>,
  ) {}

  async run(
    params: UseCase.Params,
  ): Promise<Either<UseCase.Errors, UseCase.Result>> {
    const httpResponse = await this.httpClient.request({
      url: '/login',
      method: 'post',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case 200:
        return right(httpResponse.body)
    }
  }
}
describe('LoginUseCase', () => {
  it('should make call http request with correct params and return http response body', async () => {
    const loginParams = mockLoginParams()
    const loginResult = mockLoginResult()

    const httpClient = new FakeHttpClient()
    const loginUseCase = new LoginUseCase(httpClient)

    const httpRequestSpy = jest.spyOn(httpClient, 'request')

    jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
      statusCode: 200,
      body: loginResult,
    })

    const resultOrError = await loginUseCase.run(loginParams)
    const result = resultOrError.right()

    expect(httpRequestSpy).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: loginParams,
    })
    expect(result).toMatchObject(loginResult)
  })
})
