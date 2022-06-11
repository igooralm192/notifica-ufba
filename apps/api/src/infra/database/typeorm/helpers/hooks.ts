// import config from '@/infra/database/typeorm/config'
// import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
// // import { DataSource } from 'typeorm'

// export const useTypeORMTestConnection = (beforeAllCb?: () => Promise<void>) => {
//   let datasource: DataSource

//   beforeAll(async () => {
//     datasource = (await TypeORMConnection.getInstance()
//       .setDataSource(new DataSource(config.test))
//       .connect())!

//     beforeAllCb?.()
//   })

//   afterEach(async () => {
//     await datasource.synchronize(true)
//   })

//   afterAll(async () => {
//     await datasource.destroy()
//   })

//   return () => datasource
// }
