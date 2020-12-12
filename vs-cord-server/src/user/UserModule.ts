import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { UserController } from './controllers/UserController'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
