import { CommonError, LoginError } from '@notifica-ufba/domain/errors'
import { UserMocks, LoginMocks } from '@notifica-ufba/domain/mocks'

import { LoginUseCase } from '@/data/usecases/login'
import { LoginController } from '@/presentation/controllers/login'

import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { useTypeORMTestConnection } from '@/infra/database/typeorm/helpers'
import { setupApp } from '@/main/config/app'
import { UserMapper } from '@/presentation/mappers'

import bcrypt from 'bcryptjs'
import { Express } from 'express'
import faker from 'faker'
import request from 'supertest'

let app: Express

describe('POST /login', () => {
  const getConnection = useTypeORMTestConnection(async () => {
    app = setupApp()
  })

  it('should return 200 on success', async () => {
    const user = UserMocks.mockUser()

    await getConnection().manager.insert(TypeORMUserEntity, {
      ...user,
      // TODO: Put bcrypt salt in environment variable
      password: await bcrypt.hash(user.password, 10),
    })

    const response = await request(app).post('/api/login').send({
      email: user.email,
      password: user.password,
    })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      token: expect.any(String),
      user: UserMapper.toDTO({ ...user }),
    })
  })

  it('should return 400 on validation error', async () => {
    const invalidEmail = faker.random.word()
    const response = await request(app).post('/api/login').send({
      email: invalidEmail,
      password: faker.random.word(),
    })

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      type: CommonError.ValidationError.name,
    })
  })

  it('should return 404 on user not found', async () => {
    const response = await request(app)
      .post('/api/login')
      .send(LoginMocks.mockLoginParams())

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      type: LoginError.UserDoesNotExistError.name,
    })
  })

  it('should return 401 on wrong password', async () => {
    const user = UserMocks.mockUser()

    await getConnection().manager.insert(TypeORMUserEntity, {
      ...user,
      password: faker.datatype.string(6),
    })

    const response = await request(app)
      .post('/api/login')
      .send({ email: user.email, password: faker.datatype.string(6) })

    expect(response.status).toBe(401)
    expect(response.body).toMatchObject({
      type: LoginError.WrongPasswordError.name,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    jest
      .spyOn(LoginUseCase.prototype, 'run')
      .mockImplementationOnce(async () => {
        throw new Error()
      })

    const response = await request(app)
      .post('/api/login')
      .send(LoginMocks.mockLoginParams())

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      type: CommonError.UnexpectedError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    jest
      .spyOn(LoginController.prototype, 'handle')
      .mockImplementationOnce(async () => {
        throw new Error()
      })

    const response = await request(app)
      .post('/api/login')
      .send(LoginMocks.mockLoginParams())

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      type: CommonError.UnexpectedError.name,
    })
  })
})
