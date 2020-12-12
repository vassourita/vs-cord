import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthModule } from './auth/AuthModule'
import { ConfigModule } from './config/ConfigModule'
import { UserModule } from './user/UserModule'

@Module({
  imports: [ConfigModule, UserModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
