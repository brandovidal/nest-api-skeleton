import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ResponseMessage } from '@/common/decorators/response-message.decorator'

import { AuthService } from './auth.service'

import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

import { UserEntity } from '@/models/user/entities/user.entity'
import { Auth } from './entities/auth.entity'

// TODO: create unit test
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiCreatedResponse({ type: Auth })
  @ResponseMessage('Login successfully')
  async signIn(@Body() { username, password }: SignInDto) {
    return await this.authService.signIn(username, password)
  }

  @Post('sign-up')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @ResponseMessage('Register successfully')
  async signUp(@Body() { username, password }: SignUpDto) {
    return await this.authService.signUp(username, password)
  }
}
