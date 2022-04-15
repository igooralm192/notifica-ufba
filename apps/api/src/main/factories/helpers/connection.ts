import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
import { makeDataSource } from '@/main/factories/helpers/datasource'

export const makeTypeORMConnection = () => {
  return TypeORMConnection.getInstance().setDataSource(makeDataSource())
}
