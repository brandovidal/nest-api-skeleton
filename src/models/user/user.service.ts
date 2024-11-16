import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { PostgresProviderService } from '@/providers/database/postgres/provider.service'
import { UserCreateInput } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private provider: PostgresProviderService) {}

  async create(createUserDto: CreateUserDto) {
    const data: UserCreateInput = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password
    }

    return await this.provider.user.create({ data })
  }

  findAll() {
    return this.provider.user.findMany()
  }

  findOne(id: string) {
    return this.provider.user.findUnique({ where: { id } })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user, ${JSON.stringify(updateUserDto)}}`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
