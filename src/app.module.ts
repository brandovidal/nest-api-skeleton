import { Module } from '@nestjs/common';

import { MysqlModule } from './providers/database/mysql.module';
import { PeopleModule } from './models/people/people.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MysqlModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
