import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
import { Connection } from 'typeorm'

export const useTypeORMTestConnection = (beforeAllCb?: () => Promise<void>) => {
  let connection: Connection

  beforeAll(async () => {
    connection = await TypeORMConnection.getInstance().connect()

    beforeAllCb?.()
  })

  afterEach(async () => {
    await connection.synchronize(true)
  })

  afterAll(async () => {
    await connection.close()
  })

  return () => connection
}
