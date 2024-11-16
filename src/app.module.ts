import { Module } from '@nestjs/common'

import { LoggerModule } from './providers/logger/logger.module'
import { PostgresProviderModule } from './providers/database/postgres/provider.module'
import { ApiProviderModule } from './providers/api/provider.module'

import { UserModule } from './models/user/user.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

@Module({
  imports: [LoggerModule, PostgresProviderModule, ApiProviderModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
