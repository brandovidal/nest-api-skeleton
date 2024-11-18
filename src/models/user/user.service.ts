import { Logger, Injectable } from '@nestjs/common'

import { PostgresRepository } from '@/config/database/postgres/repository.service'

import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { User, UserCreateInput, UserUpdateInput } from './entities/user.entity'

import { Nullable } from '@/common/helpers/nullable.helper'

export const ROUNDS_OF_HASHING = 10

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  private readonly repository = new PostgresRepository()

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, ROUNDS_OF_HASHING)

    const data: UserCreateInput = {
      ...createUserDto,
      password: hashedPassword
    }
    return await this.repository.user.create({ data })
  }

  async findAll(): Promise<Nullable<User[]>> {
    return await this.repository.user.findMany({ include: { profile: true, posts: true } })
  }

  async findOne(id: string): Promise<Nullable<User>> {
    return await this.repository.user.findUnique({ where: { id }, include: { profile: true, posts: true } })
  }

  async findByEmail(email: string): Promise<Nullable<User>> {
    return await this.repository.user.findFirst({ where: { email } })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const data: UserUpdateInput = { ...updateUserDto }

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, ROUNDS_OF_HASHING)
    }

    return await this.repository.user.update({ data, where: { id } })
  }

  async remove(id: string): Promise<User> {
    return await this.repository.user.delete({ where: { id } })
  }
}
