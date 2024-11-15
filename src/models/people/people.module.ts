import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';

import { PeopleController } from './people.controller';

import { PeopleService } from './people.service';
import { ApiService } from '../../providers/api/api.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService, ApiService],
})
export class PeopleModule {}
