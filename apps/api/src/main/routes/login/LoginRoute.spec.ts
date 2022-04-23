import { CommonError, LoginError } from '@/domain/errors'
import { mockUser } from '@/domain/mocks/entities'
import { mockLoginInput } from '@/domain/mocks/inputs'
import { LoginUseCase } from '@/domain/usecases/login'

import { LoginController } from '@/application/controllers/login'

import { usePrismaTestClient } from '@/infra/database/prisma/helpers'

import { makeApp } from '@/main/config/app'

import bcrypt from 'bcryptjs'
import express from 'express'
import faker from 'faker'
import request from 'supertest'

jest.setTimeout(30000)

let app: express.Express

describe('POST /login', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().user.deleteMany()
  })

  it('should return 200 on success', async () => {
    const user = mockUser()

    await getClient().user.create({
      data: {
        ...user,
        // TODO: Put bcrypt salt in environment variable
        password: await bcrypt.hash(user.password, 10),
      },
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
      code: CommonError.ValidationError.name,
    })
  })

  it('should return 404 on user not found', async () => {
    const response = await request(app)
      .post('/api/login')
      .send(mockLoginInput())

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      code: LoginError.UserDoesNotExistError.name,
    })
  })

  it('should return 401 on wrong password', async () => {
    const user = mockUser()

    await getClient().user.create({
      data: {
        ...user,
        password: faker.datatype.string(6),
      },
    })

    const response = await request(app)
      .post('/api/login')
      .send({ email: user.email, password: faker.datatype.string(6) })

    expect(response.status).toBe(401)
    expect(response.body).toMatchObject({
      code: LoginError.WrongPasswordError.name,
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
      code: CommonError.InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    jest
      .spyOn(LoginController.prototype, 'handle')
      .mockImplementationOnce(async () => {
        const error = new Error('any_error_message')
        error.stack = 'any_stack'
        throw error
      })

    const response = await request(app)
      .post('/api/login')
      .send(mockLoginInput())

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: CommonError.InternalServerError.name,
      stack: 'any_stack',
    })
  })
})
