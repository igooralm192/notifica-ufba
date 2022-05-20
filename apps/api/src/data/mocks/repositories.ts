import {
  ICountDisciplineRepository,
  ICreateStudentRepository,
  ICreateUserRepository,
  IFindAllDisciplineRepository,
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  IFindOneUserRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

export class MockedDisciplineGroupRepository
  implements
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository
{
  findOne(): Promise<IFindOneDisciplineGroupRepository.Output> {
    throw new Error('Method not implemented.')
  }
  pushStudent(): Promise<IDisciplineGroup> {
    throw new Error('Method not implemented.')
  }
}

export class MockedDisciplineRepository
  implements ICountDisciplineRepository, IFindAllDisciplineRepository
{
  count(): Promise<ICountDisciplineRepository.Output> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<IFindAllDisciplineRepository.Output> {
    throw new Error('Method not implemented.')
  }
}

export class MockedStudentRepository
  implements IFindOneStudentRepository, ICreateStudentRepository
{
  create(): Promise<ICreateStudentRepository.Output> {
    throw new Error('Method not implemented.')
  }
  findOne(): Promise<IFindOneStudentRepository.Output> {
    throw new Error('Method not implemented.')
  }
}

export class MockedUserRepository
  implements ICreateUserRepository, IFindOneUserRepository
{
  create(): Promise<ICreateUserRepository.Output> {
    throw new Error('Method not implemented.')
  }
  findOne(): Promise<IFindOneUserRepository.Output> {
    throw new Error('Method not implemented.')
  }
}
