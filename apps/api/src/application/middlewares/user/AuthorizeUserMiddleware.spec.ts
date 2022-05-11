import { MockedGetUserIdByTokenUseCase } from '@notifica-ufba/domain/mocks'
import { BaseError } from '@notifica-ufba/errors'
import { left, right } from '@notifica-ufba/utils'

import { ExpiredTokenError, InvalidTokenError } from '@/data/errors'

import faker from 'faker'

import { AuthorizeUserMiddleware } from '.'

const makeSUT = () => {
  const userId = faker.datatype.uuid()

  const getUserIdByTokenUseCase = new MockedGetUserIdByTokenUseCase()
  const authorizeUserMiddleware = new AuthorizeUserMiddleware(
    getUserIdByTokenUseCase,
  )

  const getUserIdByTokenUseCaseSpy = jest.spyOn(getUserIdByTokenUseCase, 'run')
  getUserIdByTokenUseCaseSpy.mockResolvedValue(right({ userId }))

  return {
    SUT: authorizeUserMiddleware,
    getUserIdByTokenUseCaseSpy,
    userId,
  }
}

describe('AuthorizeUserMiddleware', () => {
  it('should call getUserIdByToken usecase correctly', async () => {
    const { SUT, getUserIdByTokenUseCaseSpy } = makeSUT()

    await SUT.handle({
      headers: {
        authorization: 'Bearer any-token',
      },
    })

    expect(getUserIdByTokenUseCaseSpy).toHaveBeenCalledWith({
      token: 'any-token',
    })
  })

  it('should authorize a user returning your userId on status 200', async () => {
    const { SUT, userId } = makeSUT()

    const response = await SUT.handle({
      headers: {
        authorization: 'Bearer any-token',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({ userId })
  })

  it('should return status 400 when token was not provided', async () => {
    const { SUT } = makeSUT()

    const response = await SUT.handle({
      headers: {},
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      code: 'MissingTokenError',
      message: 'Token não encontrado.',
    })
  })

  it('should return status 401 on InvalidTokenError thrown by usecase', async () => {
    const { SUT, getUserIdByTokenUseCaseSpy } = makeSUT()

    getUserIdByTokenUseCaseSpy.mockResolvedValue(left(new InvalidTokenError()))

    const response = await SUT.handle({
      headers: {
        authorization: 'Bearer any-token',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      code: 'InvalidTokenError',
      message: 'Token inválido.',
    })
  })

  it('should return status 401 on ExpiredTokenError thrown by usecase', async () => {
    const { SUT, getUserIdByTokenUseCaseSpy } = makeSUT()

    getUserIdByTokenUseCaseSpy.mockResolvedValue(left(new ExpiredTokenError()))

    const response = await SUT.handle({
      headers: {
        authorization: 'Bearer any-token',
      },
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      code: 'ExpiredTokenError',
      message: 'Token expirado.',
    })
  })

  it('should return status 500 on any error thrown by usecase', async () => {
    const { SUT, getUserIdByTokenUseCaseSpy } = makeSUT()

    getUserIdByTokenUseCaseSpy.mockResolvedValue(
      left(new BaseError('any-code', 'any-message', undefined, 'any-stack')),
    )

    const response = await SUT.handle({
      headers: {
        authorization: 'Bearer any-token',
      },
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toMatchObject({
      code: 'InternalServerError',
      message: 'Erro interno no servidor.',
      stack: 'any-stack',
    })
  })
})
