import { NestFactory } from '@nestjs/core'

import { AppModule } from './AppModule'
import { ConfigModule } from './config/ConfigModule'

async function main() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })

  app.setGlobalPrefix('/api')

  const { port } = ConfigModule.appConfig()

  await app.listen(port)
}
main()
