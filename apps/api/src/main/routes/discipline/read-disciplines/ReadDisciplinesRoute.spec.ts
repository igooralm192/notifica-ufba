import { CommonError } from '@notifica-ufba/domain/errors'

import { ReadDisciplinesUseCase } from '@/data/usecases/discipline'
import { ReadDisciplinesController } from '@/application/controllers/discipline'
import { DisciplineViewModel } from '@/application/models'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import express from 'express'
import faker from 'faker'
import request from 'supertest'

let app: express.Express

const makeSUT = () => {
  const readDisciplinesRequest = request(app).get('/api/disciplines')

  const readDisciplinesUseCaseSpy = jest.spyOn(
    ReadDisciplinesUseCase.prototype,
    'run',
  )

  const readDisciplinesControllerSpy = jest.spyOn(
    ReadDisciplinesController.prototype,
    'handle',
  )

  return {
    SUT: readDisciplinesRequest,
    readDisciplinesUseCaseSpy,
    readDisciplinesControllerSpy,
  }
}

describe('GET /disciplines', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().discipline.deleteMany()
  })

  it('should return 200 on success', async () => {
    const { SUT } = makeSUT()

    const discipline = await getClient().discipline.create({
      data: {
        name: faker.name.title(),
        code: faker.random.word(),
        course: faker.name.jobTitle(),
        semester: faker.random.word(),
      },
    })

    const response = await SUT.send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      results: [DisciplineViewModel.fromDTO(discipline)],
      total: 1,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, readDisciplinesUseCaseSpy } = makeSUT()

    readDisciplinesUseCaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.send()

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: CommonError.InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, readDisciplinesControllerSpy } = makeSUT()

    readDisciplinesControllerSpy.mockImplementationOnce(async () => {
      const error = new Error('any_error_message')
      error.stack = 'any_stack'
      throw error
    })

    const response = await SUT.send()

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: CommonError.InternalServerError.name,
      stack: 'any_stack',
    })
  })
})
