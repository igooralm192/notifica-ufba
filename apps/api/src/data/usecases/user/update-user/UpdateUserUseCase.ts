import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import { IUpdateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IUserRepository } from '@/data/contracts'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly updateUserRepository: IUserRepository.Update,
  ) {}

  async run({
    id,
    data,
  }: IUpdateUserUseCase.Input): Promise<
    Either<BaseError, IUpdateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: id.userId })

    if (!user) {
      return left(new AuthenticateUserError.UserDoesNotExistError())
    }

    const updatedUser = await this.updateUserRepository.update({
      where: { id: id.userId },
      data,
    })

    return right({ user: updatedUser })
  }
}
