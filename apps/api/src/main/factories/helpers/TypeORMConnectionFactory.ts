import { TypeORMConnection } from '@/infra/database/typeorm/helpers'

import { makeTypeORMDataSource } from './TypeORMDataSourceFactory'

export const makeTypeORMConnection = () => {
  return TypeORMConnection.getInstance().setDataSource(makeTypeORMDataSource())
}
