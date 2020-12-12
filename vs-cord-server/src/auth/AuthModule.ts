import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthController } from './Controllers/AuthController'
import { GithubAuthStrategy } from './GithubAuthStrategy'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  controllers: [AuthController],
  providers: [GithubAuthStrategy]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
