import { Presenter } from '@/application/presenters/Presenter'
import { CommonError } from '@/domain/errors'

export interface IControllerResponse {
  statusCode: number
  body: any
}

export abstract class Controller {
  constructor(private readonly presenter: Presenter) {}

  abstract handle(request: any): Promise<IControllerResponse>

  public async perform(request: any): Promise<IControllerResponse> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err)
    }
  }

  public ok(data: any) {
    return this.presenter.ok(data)
  }

  public badRequest(error: CommonError.DomainError) {
    return this.presenter.badRequest(error)
  }

  public unauthorized(error: CommonError.DomainError) {
    return this.presenter.unauthorized(error)
  }

  public notFound(error: CommonError.DomainError) {
    return this.presenter.notFound(error)
  }

  public fail(
    error: Error = new CommonError.DomainError(
      'UnexpectedError',
      'Erro interno no servidor.',
    ),
  ) {
    return this.presenter.fail(error)
  }
}
