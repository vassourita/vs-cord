import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, registerAs } from '@nestjs/config'

import { ConnectionOptions } from 'typeorm'

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
    port: parseInt(process.env.PORT) || 3000,
    env: process.env.NODE_ENV
  }))

  public static githubConfig = registerAs('github', () => ({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callback: process.env.GITHUB_CALLBACK
  }))

  public static typeormConfig = registerAs<() => Record<string, ConnectionOptions>>('typeorm', () => ({
    development: {
      type: 'postgres',
      name: 'vscord-pg',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME || 'vscord',
      username: process.env.DATABASE_USER || 'docker',
      password: process.env.DATABASE_PASS || 'docker',
      autoLoadEntities: true
    }
  }))
}
