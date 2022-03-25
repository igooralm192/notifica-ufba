import { CommonError, LoginError } from '@/domain/errors'
import { ILoginUseCase } from '@/domain/usecases'

import { Controller } from '@/application/controllers/Controller'
import { LoginPresenter } from '@/application/presenters/login'

export class LoginController extends Controller {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    presenter: LoginPresenter,
  ) {
    super(presenter)
  }

  async handle(request: any): Promise<any> {
    const result = await this.loginUseCase.run(request)

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case LoginError.UserDoesNotExistError:
        return this.notFound(result.value)

      case LoginError.WrongPasswordError:
        return this.unauthorized(result.value)

      case CommonError.ValidationError:
        return this.badRequest(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
