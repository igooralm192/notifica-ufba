import 'reflect-metadata'

import { DatabaseError } from '@/domain/errors'
import env from '@/main/config/env'

import { QueryRunner, Repository, ObjectType, DataSource } from 'typeorm'

export class TypeORMConnection {
  private static instance?: TypeORMConnection
  private datasource?: DataSource
  private query?: QueryRunner

  private constructor() {
    this.datasource = new DataSource({
      type: env.DB_TYPE as any,
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    })
  }

  

  static getInstance(options?:): TypeORMConnection {
    if (!TypeORMConnection.instance)
      TypeORMConnection.instance = new TypeORMConnection()

    return TypeORMConnection.instance
  }

  async connect(): Promise<DataSource> {
    return await this.datasource.initialize()
  }

  async disconnect(): Promise<void> {
    if (this.datasource === undefined)
      throw new DatabaseError.ConnectionNotFoundError()

    await this.datasource.destroy()

    this.query = undefined
    this.datasource = undefined
  }

  // async openTransaction(): Promise<void> {
  //   if (this.connection === undefined)
  //     throw new DatabaseError.ConnectionNotFoundError()

  //   this.query = this.connection.createQueryRunner()
  //   await this.query.startTransaction()
  // }

  // async closeTransaction(): Promise<void> {
  //   if (this.query === undefined)
  //     throw new DatabaseError.TransactionNotFoundError()

  //   await this.query.release()
  // }

  // async commitTransaction(): Promise<void> {
  //   if (this.query === undefined)
  //     throw new DatabaseError.TransactionNotFoundError()

  //   await this.query.commitTransaction()
  // }

  // async rollbackTransaction(): Promise<void> {
  //   if (this.query === undefined)
  //     throw new DatabaseError.TransactionNotFoundError()

  //   await this.query.rollbackTransaction()
  // }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.datasource === undefined)
      throw new DatabaseError.ConnectionNotFoundError()

    if (this.query !== undefined)
      return this.query.manager.getRepository(entity)

    return this.datasource.getRepository(entity)
  }
}
