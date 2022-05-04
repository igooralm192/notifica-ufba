import { CreateUserError } from '@notifica-ufba/domain/errors'
import { ICreateUserUseCase } from '@notifica-ufba/domain/usecases'

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
      return this.ok({
        user: UserViewModel.fromDTO(result.value.user),
      })
    }

    switch (result.value.constructor) {
      case CreateUserError.UserAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
