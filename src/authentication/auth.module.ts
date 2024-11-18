import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '@/models/user/user.module'

import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

export const JWT_SECRET_KEY = 'JWT_SECRET_KEY'

@Module({
  imports: [AuthModule, UserModule, PassportModule, JwtModule.register({ global: true, secret: JWT_SECRET_KEY, signOptions: { expiresIn: '5m' } })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
