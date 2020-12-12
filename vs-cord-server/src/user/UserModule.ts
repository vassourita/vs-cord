import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { UserController } from './controllers/UserController'

@Module({
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
