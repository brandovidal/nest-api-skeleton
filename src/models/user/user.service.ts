import { Logger, Injectable } from '@nestjs/common'

import { PostgresRepository } from '@/config/database/postgres/repository.service'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { User, UserCreateInput, UserUpdateInput } from './entities/user.entity'

import { Nullable } from '@/common/helpers/nullable.helper'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  private readonly repository = new PostgresRepository()

  async create(createDto: CreateUserDto): Promise<User> {
    const data: UserCreateInput = {
      username: createDto.username,
      email: createDto.email,
      password: createDto.password,
      name: createDto.name,
      role: createDto.role
    }
    return await this.repository.user.create({ data })
  }

  async findAll(): Promise<Nullable<User[]>> {
    return await this.repository.user.findMany({ include: { profile: true, posts: true } })
  }

  async findOne(id: string): Promise<Nullable<User>> {
    return await this.repository.user.findUnique({ where: { id }, include: { profile: true, posts: true } })
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const data: UserUpdateInput = {
      email: updateDto.email,
      password: updateDto.password,
      name: updateDto.name,
      role: updateDto.role
    }
    return await this.repository.user.update({ data, where: { id } })
  }

  async remove(id: string): Promise<User> {
    return await this.repository.user.delete({ where: { id } })
  }
}
