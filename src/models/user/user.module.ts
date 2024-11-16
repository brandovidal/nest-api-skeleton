import { Module } from '@nestjs/common'

import { UserController } from './user.controller'

import { UserService } from './user.service'
import { PostgresProvider } from '@/providers/database/postgres/provider.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PostgresProvider]
})
export class UserModule {}
