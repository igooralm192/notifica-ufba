import 'module-alias/register'

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
