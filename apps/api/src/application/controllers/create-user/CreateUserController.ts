import { CreateUserError } from '@/domain/errors'
import { ICreateUserUseCase } from '@/domain/usecases'

import { IControllerResponseDTO } from '@/application/dtos'
import { BaseController } from '@/application/helpers'
import { UserViewModel } from '@/application/models'

import { IValidation } from '@/validation/protocols'

export class CreateUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {
    super()
  }

  async handle(request: any): Promise<IControllerResponseDTO> {
    const validationError = this.validation.validate(request)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.createUserUseCase.run(request)

    if (result.isRight()) {
      const { token, user } = result.value
      return this.ok({ token, user: UserViewModel.fromDTO(user).toJSON() })
    }

    switch (result.value.constructor) {
      case CreateUserError.UserAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
