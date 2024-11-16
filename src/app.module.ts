import { Module } from '@nestjs/common'

import { LoggerModule } from './common/utils/logger/logger.module'
import { PostgresProviderModule } from './providers/database/postgres/provider.module'
import { UserModule } from './models/user/user.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

@Module({
  imports: [LoggerModule, PostgresProviderModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
