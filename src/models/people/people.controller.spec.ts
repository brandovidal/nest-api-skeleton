import { Test, TestingModule } from '@nestjs/testing';

import { PeopleController } from './people.controller';

import { ConfigService } from '@nestjs/config';
import { PeopleService } from './people.service';
import { ApiService } from '../../providers/api/api.service';

import { Person } from './entities/person.entity';
import { HttpService } from '@nestjs/axios';
import { CreatePersonDto } from './dto/create-person.dto';

const mockPeopleService = {
  create: jest.fn(),
  bulk: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};
const mockApiService = {
  getData: jest.fn(),
};

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        PeopleService,
        { provide: PeopleService, useValue: mockPeopleService },
        ApiService,
        { provide: HttpService, useValue: mockApiService },
        ConfigService,
      ],
    }).compile();

    controller = app.get<PeopleController>(PeopleController);
  });

  describe('People', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return "The person has been successfully created"', async () => {
      const createPersonDto = {
        id: 1,
        name: 'test',
        deletedAt: null,
      } as CreatePersonDto;

      const person = {
        id: 1,
        name: 'test',
        deletedAt: null,
      } as Person;

      jest.spyOn(mockPeopleService, 'create').mockReturnValue(person);

      // act
      const result = await controller.create(createPersonDto);

      // assert
      expect(mockPeopleService.create).toBeCalled();
      expect(mockPeopleService.create).toBeCalledWith(createPersonDto);

      expect(result).toEqual(person);
    });

    it('should return "People data successfully"', async () => {
      const person = {
        id: 1,
        name: 'test',
        deletedAt: null,
      } as Person;
      const people = [person];

      jest.spyOn(mockPeopleService, 'findAll').mockReturnValue(people);

      // act
      const result = await controller.findAll();

      // assert
      expect(mockPeopleService.findAll).toBeCalled();
      expect(result).toEqual(people);
    });
  });
});
