import { Module } from '@nestjs/common'

import { UserController } from './user.controller'

import { UserService } from './user.service'
import { PostgresProviderService } from '@/providers/database/postgres/provider.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PostgresProviderService],
})
export class UserModule {}
