import { Injectable, UnauthorizedException } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService } from './auth.service'

import { JWT_SECRET_KEY } from './auth.module'

import { User } from '@/models/user/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY
    })
  }

  async validate(email: string, password: string): Promise<User> {
    const { user } = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
