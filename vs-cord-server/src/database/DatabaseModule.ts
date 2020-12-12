import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getConnection } from 'typeorm'

import { ConfigModule } from '../config/ConfigModule'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get(`database.${configService.get('app.env')}`)
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule implements NestModule, OnApplicationBootstrap {
  public async onApplicationBootstrap() {
    const { appConfig, typeormConfig } = ConfigModule
    const connectionName = typeormConfig()[appConfig().env].name
    const connection = getConnection(connectionName)
    await connection.runMigrations()
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
