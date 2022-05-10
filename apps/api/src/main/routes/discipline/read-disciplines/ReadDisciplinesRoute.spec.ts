// import {
//   CommonError,
//   AuthenticateUserError,
// } from '@notifica-ufba/domain/errors'
// import { mockAuthenticateUserInput } from '@notifica-ufba/domain/mocks'

// import { AuthenticateUserUseCase } from '@/data/usecases/user'
// import { AuthenticateUserController } from '@/application/controllers/authenticate-user'
// import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
// import { makeApp } from '@/main/config/app'

// import bcrypt from 'bcryptjs'
// import express from 'express'
// import faker from 'faker'
// import request from 'supertest'

// let app: express.Express

// const makeSUT = () => {
//   const authenticateUserInput = mockAuthenticateUserInput()

//   const authenticateUserRequest = request(app).post('/api/auth/user')

//   const authenticateUserUseCaseSpy = jest.spyOn(
//     AuthenticateUserUseCase.prototype,
//     'run',
//   )

//   const authenticateUserControllerSpy = jest.spyOn(
//     AuthenticateUserController.prototype,
//     'handle',
//   )

//   return {
//     SUT: authenticateUserRequest,
//     authenticateUserUseCaseSpy,
//     authenticateUserControllerSpy,
//     authenticateUserInput,
//   }
// }

// describe('POST /auth/user', () => {
//   const getClient = usePrismaTestClient(async () => {
//     app = makeApp()
//   })

//   afterEach(async () => {
//     await getClient().user.deleteMany()
//   })

//   it('should return 200 on success', async () => {
//     const { SUT, authenticateUserInput } = makeSUT()

//     const name = faker.name.firstName()
//     const { email, password } = authenticateUserInput

//     await getClient().user.create({
//       data: {
//         name,
//         email,
//         // TODO: Use bcrypt salt from .env
//         password: await bcrypt.hash(password, 10),
//       },
//     })

//     const response = await SUT.send(authenticateUserInput)

//     expect(response.status).toBe(200)
//     expect(response.body).toMatchObject({
//       token: expect.any(String),
//       user: {
//         id: expect.any(String),
//         name,
//         email,
//         createdAt: expect.any(String),
//         updatedAt: expect.any(String),
//       },
//     })
//   })

//   it('should return 400 on validation error', async () => {
//     const { SUT, authenticateUserInput } = makeSUT()

//     const response = await SUT.send({
//       ...authenticateUserInput,
//       email: faker.random.word(),
//     })

//     expect(response.status).toBe(400)
//     expect(response.body).toMatchObject({
//       code: CommonError.ValidationError.name,
//     })
//   })

//   it('should return 404 on user not found', async () => {
//     const { SUT, authenticateUserInput } = makeSUT()

//     const response = await SUT.send(authenticateUserInput)

//     expect(response.status).toBe(404)
//     expect(response.body).toMatchObject({
//       code: AuthenticateUserError.UserDoesNotExistError.name,
//     })
//   })

//   it('should return 401 on wrong password', async () => {
//     const { SUT, authenticateUserInput } = makeSUT()

//     const name = faker.name.firstName()
//     const { email, password } = authenticateUserInput

//     await getClient().user.create({
//       data: {
//         name,
//         email,
//         password,
//       },
//     })

//     const response = await SUT.send(authenticateUserInput)

//     expect(response.status).toBe(401)
//     expect(response.body).toMatchObject({
//       code: AuthenticateUserError.WrongPasswordError.name,
//     })
//   })

//   it('should return 500 on usecase unexpected error', async () => {
//     const { SUT, authenticateUserUseCaseSpy, authenticateUserInput } = makeSUT()

//     authenticateUserUseCaseSpy.mockImplementationOnce(async () => {
//       throw new Error()
//     })

//     const response = await SUT.send(authenticateUserInput)

//     expect(response.status).toBe(500)
//     expect(response.body).toMatchObject({
//       code: CommonError.InternalServerError.name,
//     })
//   })

//   it('should return 500 on controller unexpected error', async () => {
//     const { SUT, authenticateUserControllerSpy, authenticateUserInput } =
//       makeSUT()

//     authenticateUserControllerSpy.mockImplementationOnce(async () => {
//       const error = new Error('any_error_message')
//       error.stack = 'any_stack'
//       throw error
//     })

//     const response = await SUT.send(authenticateUserInput)

//     expect(response.status).toBe(500)
//     expect(response.body).toMatchObject({
//       code: CommonError.InternalServerError.name,
//       stack: 'any_stack',
//     })
//   })
// })
