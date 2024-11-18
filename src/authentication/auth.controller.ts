import { Body, Controller, Post } from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '@/common/decorators/response-message.decorator'

import { AuthService } from './auth.service'

import { LoginDto } from './dto/login.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Login successfully')
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password)
  }
}
