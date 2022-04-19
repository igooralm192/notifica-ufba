// import 'module-alias/register'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

console.log(process.env.NODE_ENV)

import { makeApp } from '@/main/config/app'
import env from '@/main/config/env'
import { makeTypeORMConnection } from '@/main/factories/helpers'

makeTypeORMConnection()
  .connect()
  .then(() => {
    const app = makeApp()

    app.listen(env.PORT, () =>
      console.log(`Running at http://localhost:${env.PORT}!!`),
    )
  })
  .catch(console.error)
