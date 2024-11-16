import { Module } from '@nestjs/common'

import { UserModule } from './models/user/user.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

import { LoggerModule } from './common/utils/logger/logger.module'

@Module({
  imports: [LoggerModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
