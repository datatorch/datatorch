import { createApp } from './app'
import * as Config from './config'

/**
 * Start API server on specified endpoint
 */
const startApp = async () => {
  const app = await createApp()
  try {
    await app.listen(Config.PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
