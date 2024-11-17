import { Test, TestingModule } from '@nestjs/testing'

import { UserController } from './user.controller'

import { UserService } from './user.service'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from '@prisma/client'

import { vi, beforeEach, describe, expect, it } from 'vitest'

const mockUserService = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn()
}

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: UserService, useValue: mockUserService }]
    }).compile()

    controller = app.get<UserController>(UserController)
  })

  describe('User', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined()
    })

    it('should return "the user has been successfully created"', async () => {
      const createUserDto = {
        username: 'test',
        email: 'test@email.com',
        password: '123456'
      } as CreateUserDto

      const user = { ...createUserDto } as User

      vi.spyOn(mockUserService, 'create').mockReturnValue(user)

      // act
      const result = await controller.create(createUserDto)

      // assert
      expect(mockUserService.create).toBeCalled()
      expect(mockUserService.create).toBeCalledWith(createUserDto)
      expect(result).toEqual(user)
    })

    it('should return "User data has been successfully retrieved', async () => {
      const user = {
        id: '1',
        username: 'test',
        email: 'test@email.com',
        password: '123456'
      } as User
      const users = [user]

      vi.spyOn(mockUserService, 'findAll').mockReturnValue(users)

      // act
      const result = await controller.findAll()

      // assert
      expect(mockUserService.findAll).toBeCalled()
      expect(result).toEqual(users)
    })
  })
})
