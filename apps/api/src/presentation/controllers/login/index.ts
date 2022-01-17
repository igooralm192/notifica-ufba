import { IError, LoginError } from '@notifica-ufba/domain/errors'
import { ILoginUseCase } from '@notifica-ufba/domain/usecases'

import { IUserDTO } from '@/presentation/dtos'
import { BaseController } from '@/presentation/helpers'
import { UserMapper } from '@/presentation/mappers'
import { IHttpResponse, IValidation } from '@/presentation/protocols'

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }

  export type Response = {
    token: string
    user: IUserDTO
  }
}

export class LoginController extends BaseController<
  LoginController.Request,
  LoginController.Response
> {
  constructor(
    private readonly validation: IValidation<LoginController.Request>,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    super()
  }

  async handle(
    request: LoginController.Request,
  ): Promise<IHttpResponse<IError | LoginController.Response>> {
    const validationError = await this.validation.validate(request)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.loginUseCase.run(request)

    if (result.isRight()) {
      const { token, user } = result.value
      return this.ok({ token, user: UserMapper.toDTO(user) })
    }

    switch (result.value.constructor) {
      case LoginError.UserDoesNotExistError:
        return this.notFound(result.value)

      case LoginError.WrongPasswordError:
        return this.unauthorized(result.value)
    }
  }
}
