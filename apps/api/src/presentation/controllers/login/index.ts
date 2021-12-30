import { LoginErrors } from '@notifica-ufba/domain/errors'
import { LoginUseCase } from '@notifica-ufba/domain/usecases'

import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { BaseController } from '@/presentation/helpers'

export class LoginController extends BaseController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loginUseCase: LoginUseCase,
  ) {
    super()
  }

  async handle(request: any): Promise<HttpResponse<any>> {
    const error = await this.validation.validate(request)

    if (error) {
      return this.validationError(error)
    }

    const result = await this.loginUseCase.run(request)

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case LoginErrors.UserDoesNotExistError:
          return this.notFound(result.value)

        case LoginErrors.WrongPasswordError:
          return this.unauthorized(result.value)

        default:
          return this.fail(result.value)
      }
    }

    return this.ok(result.value)
  }
}
