import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthController } from './Controllers/AuthController'
import { GithubAuthStrategy } from './GithubAuthStrategy'

@Module({
  controllers: [AuthController],
  providers: [GithubAuthStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
