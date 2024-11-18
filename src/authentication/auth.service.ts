import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UserService } from '../models/user/user.service'

import { INVALID_CREDENTIALS, USER_NOT_EXISTS } from '@/common/constants/auth.constant'

import { Auth } from './entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Auth> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException(USER_NOT_EXISTS)
    }

    const isPasswordValid = await this.passworMatch(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_CREDENTIALS)
    }

    const accessToken = this.jwtService.sign({ userId: user.id })

    // const { password: _, ...newUser } = user as UserEntity

    return { user, accessToken }
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async login(email: string, password: string): Promise<Auth> {
    return await this.validateUser(email, password)
  }
}
