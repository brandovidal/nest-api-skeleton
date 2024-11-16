import { Module } from '@nestjs/common'

import { UserController } from './user.controller'

import { UserService } from './user.service'
import { PostgresRepository } from '@/providers/database/postgres/repository.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PostgresRepository]
})
export class UserModule {}
