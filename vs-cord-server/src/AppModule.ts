import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthModule } from './auth/AuthModule'
import { ConfigModule } from './config/ConfigModule'
import { DatabaseModule } from './database/DatabaseModule'
import { UserModule } from './user/UserModule'

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
