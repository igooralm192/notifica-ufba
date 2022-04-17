import { DataSourceOptions } from 'typeorm'

const config: Record<string, DataSourceOptions> = {
  development: {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['apps/api/src/infra/database/typeorm/entities/*.{ts,js}'],
    migrations: ['apps/api/src/infra/database/typeorm/migrations/*.{ts,js}'],
    // @ts-ignore
    cli: {
      migrationsDir: 'src/infra/database/typeorm/migrations',
    },
  },
  production: {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['apps/api/src/infra/database/typeorm/entities/*.{ts,js}'],
    migrations: ['apps/api/src/infra/database/typeorm/migrations/*.{ts,js}'],
    // @ts-ignore
    cli: {
      migrationsDir: 'src/infra/database/typeorm/migrations',
    },
  },
  test: {
    type: 'sqlite',
    database: './db.sqlite',
    synchronize: true,
    logging: false,
    entities: ['apps/api/src/infra/database/typeorm/entities/*.{ts,js}'],
  },
}

export default config
