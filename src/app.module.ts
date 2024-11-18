import { Module } from '@nestjs/common'

import { LoggerModule } from './providers/logger/logger.module'
import { PostgresProviderModule } from './providers/database/postgres/provider.module'

import { UserModule } from './models/user/user.module'
import { AuthModule } from './models/auth/auth.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

@Module({
  imports: [LoggerModule, PostgresProviderModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
