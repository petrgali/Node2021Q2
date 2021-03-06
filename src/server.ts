import { PORT } from './common/config'
import app from './app'
import { createConnection } from 'typeorm'
import config from './common/ormconfig'
import { createRoot } from './init'

(async () => {
  try {
    const connection = await createConnection(config)
    if (connection.isConnected) console.log('Succesfully connected to DB')
    await createRoot()
  } catch (err) {
    console.log("Error while connecting to database", err)
    return err
  }
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
})()
