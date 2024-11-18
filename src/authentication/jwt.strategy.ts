import { Injectable } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService } from './auth.service'
import { UserService } from '@/models/user/user.service'

import { JWT_SECRET_KEY } from '@/common/constants/jwt.constant'
import { UnauthorizedException } from '@/common/exceptions/unauthorized.exception'

import { User } from '@/models/user/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY
    })
  }

  async validate(payload: { userId: string }): Promise<User> {
    const user = await this.userService.findOne(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
