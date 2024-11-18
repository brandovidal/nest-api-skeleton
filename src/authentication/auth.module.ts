import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from '@/common/constants/jwt.constant'

import { UserModule } from '@/models/user/user.module'

import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [AuthModule, UserModule, PassportModule, JwtModule.register({ global: true, secret: JWT_SECRET_KEY, signOptions: { expiresIn: '5m' } })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
