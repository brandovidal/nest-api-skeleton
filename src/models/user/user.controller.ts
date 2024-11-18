import { Controller, Get, Post, Body, Put, Param, Delete, Logger, UseGuards } from '@nestjs/common'

import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ResponseMessage } from '@/common/decorators/response-message.decorator'

import { UserService } from './user.service'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { UserEntity } from './entities/user.entity'

@Controller('user')
@ApiTags('User')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiCreatedResponse({ type: UserEntity })
  @ResponseMessage('User has been successfully created')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Get('all')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ResponseMessage('All users have been successfully retrieved')
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ResponseMessage('User has been successfully retrieved')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ResponseMessage('User has been successfully updated')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ResponseMessage('User has been successfully deleted')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id)
  }
}
