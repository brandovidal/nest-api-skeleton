import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common'

import { ResponseMessage } from '@/common/decorators/response-message.decorator'

import { UserService } from './user.service'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ResponseMessage('User has been successfully created')
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Request to create user: ${JSON.stringify(createUserDto)}`)
    return await this.userService.create(createUserDto)
  }

  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
