import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
import env from '@/main/config/env'
import { DataSource, DataSourceOptions } from 'typeorm'

const defaultOptions: DataSourceOptions = {
  type: 'sqlite',
  database: env.DB_NAME,
}

export const useTypeORMTestConnection = (beforeAllCb?: () => Promise<void>) => {
  let datasource: DataSource

  beforeAll(async () => {
    datasource = await new TypeORMConnection(defaultOptions).connect()

    beforeAllCb?.()
  })

  afterEach(async () => {
    await datasource.synchronize(true)
  })

  afterAll(async () => {
    await datasource.destroy()
  })

  return () => datasource
}
