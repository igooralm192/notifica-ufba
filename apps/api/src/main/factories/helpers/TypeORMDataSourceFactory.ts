import config from '@/infra/database/typeorm/config'
import env from '@/main/config/env'

import { DataSource } from 'typeorm'

export const makeTypeORMDataSource = () => {
  return new DataSource(config[env.NODE_ENV])
}
