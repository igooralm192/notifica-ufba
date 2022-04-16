import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
import { makeTypeORMDataSource } from '@/main/factories/helpers/TypeORMDataSourceFactory'

export const makeTypeORMConnection = () => {
  return TypeORMConnection.getInstance().setDataSource(makeTypeORMDataSource())
}
