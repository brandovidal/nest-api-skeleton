import { Logger, Injectable } from '@nestjs/common'

import { PostgresRepository } from '@/config/database/postgres/repository.service'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { UserCreateInput, UserUpdateInput } from './entities/user.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  private readonly repository = new PostgresRepository()

  async create(createDto: CreateUserDto) {
    const data: UserCreateInput = createDto
    console.log('🚀 ~ UserService ~ create ~ data:', data)
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
