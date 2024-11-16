import { Logger } from '@nestjs/common'
import { App } from './app'

async function bootstrap() {
  const app = await App()

  const logger = new Logger('Bootstrap')

  const port = process.env.PORT ?? 5000

  await app.listen(port)

  logger.log(`Server is running on port http://localhost:${port}`)
}
bootstrap()
