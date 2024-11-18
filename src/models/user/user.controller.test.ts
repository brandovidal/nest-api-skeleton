import { Test, TestingModule } from '@nestjs/testing'

import { UserController } from './user.controller'

import { UserService } from './user.service'

import { UpdateUserDto } from './dto/update-user.dto'

import { User } from '@prisma/client'

import { vi, beforeEach, describe, expect, it } from 'vitest'

const mockUserService = {
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

    it('should return "the user has been successfully updated"', async () => {
      const userId = '1'
      const updateUserDto = {
        name: 'Test User'
      } as UpdateUserDto

      const user = { ...updateUserDto } as User

      vi.spyOn(mockUserService, 'update').mockReturnValue(user)

      // act
      const result = await controller.update(userId, updateUserDto)

      // assert
      expect(mockUserService.update).toBeCalled()
      expect(mockUserService.update).toBeCalledWith(userId, updateUserDto)
      expect(result).toEqual(user)
    })

    it('should return "User data has been successfully retrieved', async () => {
      const user = {
        id: '1',
        username: 'test',
        email: 'test@email.com',
        password: 'admin'
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
