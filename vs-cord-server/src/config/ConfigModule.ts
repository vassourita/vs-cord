import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, registerAs } from '@nestjs/config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [ConfigModule.appConfig, ConfigModule.githubConfig]
    })
  ]
})
export class ConfigModule {
  public static appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT) || 3000
  }))

  public static githubConfig = registerAs('github', () => ({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callback: process.env.GITHUB_CALLBACK
  }))
}
