import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UserService } from '../models/user/user.service'

import { INVALID_CREDENTIALS, USER_NOT_EXISTS } from '@/common/constants/auth.constant'

import { Auth, UserAuth } from './entities/auth.entity'

import { Helper } from '@/common/helpers/global.helper'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Auth> {
    const userFinded = await this.userService.findByEmail(email)
    if (!userFinded) {
      throw new NotFoundException(USER_NOT_EXISTS)
    }

    const isPasswordValid = await this.passworMatch(password, userFinded.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_CREDENTIALS)
    }

    const accessToken = this.jwtService.sign({ userId: userFinded.id })

    const user = Helper.pick(userFinded, 'email', 'name', 'role') as UserAuth

    return { accessToken, user }
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async login(email: string, password: string): Promise<Auth> {
    return await this.validateUser(email, password)
  }
}
