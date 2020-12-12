import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getConnection } from 'typeorm'

import { ConfigModule } from '../config/ConfigModule'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get(`database.${config.get('app.env')}`)
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule implements NestModule, OnModuleInit {
  public async onModuleInit() {
    const { appConfig, typeormConfig } = ConfigModule
    const connectionName = typeormConfig()[appConfig().env].name
    const connection = getConnection(connectionName)
    await connection.runMigrations()
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
}
