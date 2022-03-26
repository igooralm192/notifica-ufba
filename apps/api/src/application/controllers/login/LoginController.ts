import { CommonError, LoginError } from '@/domain/errors'
import { ILoginUseCase } from '@/domain/usecases'

import {
  Controller,
  IControllerResponse,
} from '@/application/controllers/Controller'
import { LoginViewModel } from '@/application/models/login'

export class LoginController extends Controller {
  constructor(private readonly loginUseCase: ILoginUseCase) {
    super()
  }

  async handle(request: any): Promise<IControllerResponse> {
    const result = await this.loginUseCase.run(request)

    if (result.isRight()) {
      return this.ok(LoginViewModel.toJSON(result.value))
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
