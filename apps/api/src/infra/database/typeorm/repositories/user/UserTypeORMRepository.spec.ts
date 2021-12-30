import { UserMocks } from '@notifica-ufba/domain/mocks'
import { UserTypeORM } from '@/infra/database/typeorm/entities'
import { useTypeORMTestConnection } from '@/infra/database/typeorm/helpers'

import { UserTypeORMRepository } from '.'

const makeSUT = () => {
  const userData = UserMocks.mockUser()
  const userRepository = new UserTypeORMRepository()

  return {
    SUT: userRepository,
    userData,
  }
}

describe('UserTypeORMRepository', () => {
  const getConnection = useTypeORMTestConnection()

  it('should return user if email exist', async () => {
    const { SUT, userData } = makeSUT()
    await getConnection().manager.insert(UserTypeORM, userData)

    const user = await SUT.findByEmail(userData.email)

    expect(user).toMatchObject(userData)
  })

  it('should return null if email not exist', async () => {
    const { SUT } = makeSUT()

    const user = await SUT.findByEmail('non-existent-email')

    expect(user).toBeNull()
  })
})
