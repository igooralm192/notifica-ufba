import { DatabaseError } from '@/data/errors'
import 'reflect-metadata'
import {
  Connection,
  QueryRunner,
  Repository,
  ObjectType,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository,
  ConnectionOptions,
} from 'typeorm'

import ormConfig from 'ormconfig.json'

const [defaultOptions, testOptions] = ormConfig

const isTest = process.env.NODE_ENV === 'test'

export class TypeORMConnection {
  private static instance?: TypeORMConnection
  private connection?: Connection
  private connectionOptions?: ConnectionOptions
  private query?: QueryRunner

  private constructor() {
    this.connectionOptions = (
      isTest ? this.getTestConnectionOptions() : defaultOptions
    ) as ConnectionOptions
  }

  private getTestConnectionOptions(): ConnectionOptions {
    return Object.assign(testOptions, {
      name: 'default',
    }) as ConnectionOptions
  }

  static getInstance(): TypeORMConnection {
    if (!TypeORMConnection.instance)
      TypeORMConnection.instance = new TypeORMConnection()

    return TypeORMConnection.instance
  }

  async connect(): Promise<Connection> {
    if (getConnectionManager().has('default')) {
      return (this.connection = getConnection())
    }

    return (this.connection = await createConnection(this.connectionOptions))
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined)
      throw new DatabaseError.ConnectionNotFoundError()

    await this.connection.close()

    this.query = undefined
    this.connection = undefined
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined)
      throw new DatabaseError.ConnectionNotFoundError()

    this.query = this.connection.createQueryRunner()
    await this.query.startTransaction()
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined)
      throw new DatabaseError.TransactionNotFoundError()

    await this.query.release()
  }

  async commitTransaction(): Promise<void> {
    if (this.query === undefined)
      throw new DatabaseError.TransactionNotFoundError()

    await this.query.commitTransaction()
  }

  async rollbackTransaction(): Promise<void> {
    if (this.query === undefined)
      throw new DatabaseError.TransactionNotFoundError()

    await this.query.rollbackTransaction()
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined)
      throw new DatabaseError.ConnectionNotFoundError()

    if (this.query !== undefined)
      return this.query.manager.getRepository(entity)

    return getRepository(entity)
  }
}
