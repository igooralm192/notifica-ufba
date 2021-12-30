import { TypeORMConnection } from '@/infra/database/typeorm/helpers'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'

TypeORMConnection.getInstance()
  .connect()
  .then(() => {
    const app = setupApp()

    app.listen(env.PORT, () =>
      console.log(`Running at http://localhost:${env.PORT}!`),
    )
  })
  .catch(console.error)
