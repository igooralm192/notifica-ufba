import { mockUser } from '@/domain/mocks/entities'
import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { useTypeORMTestConnection } from '@/infra/database/typeorm/helpers'

import { TypeORMUserRepository } from '.'

const makeSUT = () => {
  const user = mockUser()
  const userRepository = new TypeORMUserRepository()

  return {
    SUT: userRepository,
    user,
  }
}

describe('TypeORMUserRepository', () => {
  const getConnection = useTypeORMTestConnection()

  describe('create', () => {
    it('should create and return a user', async () => {
      const { SUT, user } = makeSUT()

      const createdUser = await SUT.create({ ...user })

      const findUser = await getConnection().manager.findOneBy(
        TypeORMUserEntity,
        {
          email: user.email,
        },
      )

      expect(createdUser).toMatchObject(findUser!)
    })
  })

  describe('findByEmail', () => {
    it('should return user if email exist', async () => {
      const { SUT, user } = makeSUT()
      await getConnection().manager.insert(TypeORMUserEntity, user)

      const findUser = await SUT.findByEmail(user.email)

      expect(findUser).toMatchObject(user)
    })

    it('should return null if email not exist', async () => {
      const { SUT } = makeSUT()

      const user = await SUT.findByEmail('non-existent-email')

      expect(user).toBeNull()
    })
  })
})
