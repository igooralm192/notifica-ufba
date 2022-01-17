import { UserMocks } from '@notifica-ufba/domain/mocks'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { useTypeORMTestConnection } from '@/infra/database/typeorm/helpers'

import { TypeORMUserRepository } from '.'

const makeSUT = () => {
  const userData = UserMocks.mockUser()
  const userRepository = new TypeORMUserRepository()

  return {
    SUT: userRepository,
    userData,
  }
}

describe('TypeORMUserRepository', () => {
  const getConnection = useTypeORMTestConnection()

  it('should return user if email exist', async () => {
    const { SUT, userData } = makeSUT()
    await getConnection().manager.insert(TypeORMUserEntity, userData)

    const user = await SUT.findByEmail(userData.email)

    expect(user).toMatchObject(userData)
  })

  it('should return null if email not exist', async () => {
    const { SUT } = makeSUT()

    const user = await SUT.findByEmail('non-existent-email')

    expect(user).toBeNull()
  })
})
