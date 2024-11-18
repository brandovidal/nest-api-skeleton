import { Body, Controller, Post } from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '@/common/decorators/response-message.decorator'

import { AuthService } from './auth.service'

import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ResponseMessage('Login successfully')
  async signIn(@Body() { username, password }: SignInDto) {
    return await this.authService.signIn(username, password)
  }

  @Post('signup')
  @ResponseMessage('Register successfully')
  async signUp(@Body() { username, password }: SignUpDto) {
    return await this.authService.signUp(username, password)
  }
}
