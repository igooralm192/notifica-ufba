// import 'module-alias/register'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

console.log(process.env.NODE_ENV)

import { makeApp } from '@/main/config/app'
import env from '@/main/config/env'
import { makeDBClient } from '@/main/factories/helpers'

import { db } from '@/main/config/firebase'

console.log(db.collection('users'))

makeDBClient()
  .connect()
  .then(() => {
    const app = makeApp()

    app.listen(env.PORT, () =>
      console.log(`Running at http://localhost:${env.PORT}!!`),
    )
  })
  .catch(console.error)

process.on('SIGTERM', () => {
  process.exit()
})
