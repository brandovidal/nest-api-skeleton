import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PeopleService } from './people.service';
import { ApiService } from '../../providers/api/api.service';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Entity } from '../../common/decorators/entity.decorator';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/person-response.dto';
import { BulkCreatePersonDto } from './dto/bulk-create-person.dto';

@Controller('people')
export class PeopleController {
  private swapiApiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {
    this.swapiApiUrl = this.configService.get('SWAPI_API_URL');
  }

  @Post('bulk')
  @ResponseMessage('People has been successfully created')
  async bulk() {
    const url = `${this.swapiApiUrl}/api/people/?format=json`;
    const data = await this.apiService.getData(url);

    const { results: people = [] } = data;
    if (people.length === 0) {
      return [];
    }

    const createPersonDto: BulkCreatePersonDto[] = people.map((person) => ({
      name: person.name,
    }));
    return this.peopleService.bulkCreate(createPersonDto);
  }

  @Post('create')
  @ResponseMessage('The person has been successfully created')
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Entity(PersonResponseDto)
  @ResponseMessage('People data successfully')
  async findAll() {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Person data successfully')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(Number(id));
  }

  @Patch(':id')
  @ResponseMessage('Updated person successfully')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(Number(id), updatePersonDto);
  }

  @Delete(':id')
  @ResponseMessage('Deleted person successfully')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(Number(id));
  }
}
