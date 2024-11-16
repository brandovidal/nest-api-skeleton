import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common'

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
  async create(@Body() createDto: CreateUserDto) {
    return await this.userService.create(createDto)
  }

  @Get('all')
  @ResponseMessage('Users have been successfully retrieved')
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @ResponseMessage('User has been successfully retrieved')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id)
  }

  @Put(':id')
  @ResponseMessage('User has been successfully updated')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return await this.userService.update(id, updateDto)
  }

  @Delete(':id')
  @ResponseMessage('User has been successfully deleted')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id)
  }
}
