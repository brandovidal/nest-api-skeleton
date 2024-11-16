import { Logger, Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { PostgresRepository } from '@/providers/database/postgres/repository.service'
import { UserCreateInput, UserUpdateInput } from './entities/user.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private repository: PostgresRepository) {}

  async create(createDto: CreateUserDto) {
    const data: UserCreateInput = {
      username: createDto.username,
      email: createDto.email,
      password: createDto.password,
      name: createDto.name,
      role: createDto.role
    }
    return await this.repository.user.create({ data })
  }

  async findAll() {
    return await this.repository.user.findMany({ include: { profile: true, posts: true } })
  }

  async findOne(id: string) {
    return await this.repository.user.findUnique({ where: { id }, include: { profile: true, posts: true } })
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const data: UserUpdateInput = {
      email: updateDto.email,
      password: updateDto.password,
      name: updateDto.name,
      role: updateDto.role
    }
    return await this.repository.user.update({ data, where: { id } })
  }

  async remove(id: string) {
    return await this.repository.user.delete({ where: { id } })
  }
}
