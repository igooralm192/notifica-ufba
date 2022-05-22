import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import { IGetUserByIdUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IFindOneUserRepository } from '@/data/contracts'

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly findOneUserRepository: IFindOneUserRepository) {}

  async run({
    userId,
  }: IGetUserByIdUseCase.Input): Promise<
    Either<BaseError, IGetUserByIdUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new AuthenticateUserError.UserDoesNotExistError())
    }

    return right({ user })
  }
}
