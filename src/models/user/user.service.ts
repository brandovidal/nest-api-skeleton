import { Logger, Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { PostgresProviderService } from '@/providers/database/postgres/provider.service'
import { UserCreateInput, UserUpdateInput } from './entities/user.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private provider: PostgresProviderService) {}

  async create(createDto: CreateUserDto) {
    const data: UserCreateInput = {
      username: createDto.username,
      email: createDto.email,
      password: createDto.password
    }
    return await this.provider.user.create({ data })
  }

  async findAll() {
    return await this.provider.user.findMany({
      include: {
        profile: true,
        posts: true
      }
    })
  }

  async findOne(id: string) {
    return await this.provider.user.findUnique({ where: { id } })
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const data: UserUpdateInput = {
      username: updateDto.username,
      email: updateDto.email,
      password: updateDto.password
    }
    return await this.provider.user.update({ data, where: { id } })
  }

  async remove(id: string) {
    return `This action removes a #${id} user`
  }
}
