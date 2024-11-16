import { Module } from '@nestjs/common'

import { PostgresRepository } from '@/config/database/postgres/repository.service'

@Module({
  imports: [],
  controllers: [],
  providers: [PostgresRepository]
})
export class PostgresProviderModule {}
