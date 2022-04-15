import { mockUser } from '@/domain/mocks/entities'
import { LoginUseCase } from '@/domain/usecases/login'
import { LoginController } from '@/application/controllers/login'

import { TypeORMUserEntity } from '@/infra/database/typeorm/entities'
import { useTypeORMTestConnection } from '@/infra/database/typeorm/helpers'
import { makeApp } from '@/main/config/app'

import bcrypt from 'bcryptjs'
import { Express } from 'express'
import faker from 'faker'
import request from 'supertest'
import { CommonError, LoginError } from '@/domain/errors'
import { mockLoginInput } from '@/domain/mocks/inputs'

jest.setTimeout(30000)

let app: Express

describe('POST /login', () => {
  const getConnection = useTypeORMTestConnection(async () => {
    app = makeApp()
  })

  it('should return 200 on success', async () => {
    const user = mockUser()

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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
      },
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
      .send(mockLoginInput())

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      type: LoginError.UserDoesNotExistError.name,
    })
  })

  it('should return 401 on wrong password', async () => {
    const user = mockUser()

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
      .send(mockLoginInput())

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
      .send(mockLoginInput())

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      type: CommonError.UnexpectedError.name,
    })
  })
})
