import { mockUser } from '@/domain/mocks/entities'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'

import { PrismaUserRepository } from '.'

const makeSUT = () => {
  const user = mockUser()
  const userRepository = new PrismaUserRepository()

  return {
    SUT: userRepository,
    user,
  }
}

describe('TypeORMUserRepository', () => {
  const getClient = usePrismaTestClient()

  afterEach(async () => {
    await getClient().user.deleteMany()
  })

  describe('create', () => {
    it('should create and return a user', async () => {
      const { SUT, user } = makeSUT()

      const createdUser = await SUT.create({ ...user })

      const findUser = await getClient().user.findFirst({
        where: { email: user.email },
      })

      expect(createdUser).toMatchObject(findUser)
    })
  })

  describe('findByEmail', () => {
    it('should return user if email exist', async () => {
      const { SUT, user } = makeSUT()
      await getClient().user.create({ data: user })

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
