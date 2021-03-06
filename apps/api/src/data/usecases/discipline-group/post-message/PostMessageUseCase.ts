import {
  AuthenticateUserError,
  DisciplineGroupDoesNotExistError,
} from '@notifica-ufba/domain/errors'
import { IPostMessageUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  ICreateDisciplineGroupMessageRepository,
  ICreateMessagingService,
  IFindAllStudentRepository,
  IFindOneDisciplineGroupRepository,
  IFindOneUserRepository,
} from '@/data/contracts'

export class PostMessageUseCase implements IPostMessageUseCase {
  constructor(
    private readonly findOneUserRepository: IFindOneUserRepository,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findAllStudentRepository: IFindAllStudentRepository,
    private readonly createDisciplineGroupMessageRepository: ICreateDisciplineGroupMessageRepository,
    private readonly createMessagingService: ICreateMessagingService,
  ) {}

  async run({
    userId,
    disciplineGroupId,
    message,
  }: IPostMessageUseCase.Input): Promise<
    Either<BaseError, IPostMessageUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new AuthenticateUserError.UserDoesNotExistError())
    }

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const allStudents = await this.findAllStudentRepository.findAll({
      where: { id: { in: disciplineGroup.studentIds } },
      include: { user: true },
    })

    const allUserIds = allStudents.results.map(({ userId }) => userId)

    const disciplineGroupMessage =
      await this.createDisciplineGroupMessageRepository.create({
        body: message,
        sentBy: user.name,
        sentById: user.id,
        disciplineGroupId,
      })

    this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code} - ${disciplineGroup.code}`,
      body: 'H?? uma nova mensagem para esta disciplina!',
      userIds: allUserIds,
    })

    return right(disciplineGroupMessage)
  }
}
