import 'reflect-metadata'

import {
  ConnectionNotFoundError,
  TransactionNotFoundError,
} from '@/data/errors'

import { QueryRunner, Repository, ObjectType, DataSource } from 'typeorm'

export class TypeORMConnection {
  private static instance?: TypeORMConnection
  private datasource?: DataSource
  private query?: QueryRunner

  private constructor() {}

  static getInstance(): TypeORMConnection {
    if (!TypeORMConnection.instance)
      TypeORMConnection.instance = new TypeORMConnection()

    return TypeORMConnection.instance
  }

  setDataSource(datasource?: DataSource) {
    this.datasource = datasource

    return this
  }

  async connect(): Promise<DataSource | null> {
    if (!this.datasource) return null
    return await this.datasource.initialize()
  }

  async disconnect(): Promise<void> {
    if (!this.datasource || !this.datasource.isInitialized)
      throw new ConnectionNotFoundError()

    await this.datasource?.destroy()

    this.query = undefined
  }

  // async openTransaction(): Promise<void> {
  //   if (this.connection === undefined)
  //     throw new ConnectionNotFoundError()

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
    if (!this.datasource || !this.datasource.isInitialized)
      throw new ConnectionNotFoundError()

    if (this.query !== undefined)
      return this.query.manager.getRepository(entity)

    return this.datasource.getRepository(entity)
  }
}
