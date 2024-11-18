import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { PostgresRepository } from '@/config/database/postgres/repository.service'
import { UserService } from '@/models/user/user.service'

import { UserNotFoundException } from '@/common/exceptions/user-not-found.exception'
import { UnauthorizedException } from '@/common/exceptions/unauthorized.exception'
import { UserExistsException } from '@/common/exceptions/user-exists.exception'

import { User, UserCreateInput } from '@/models/user/entities/user.entity'
import { Auth, UserAuth } from './entities/auth.entity'

import { Helper } from '@/common/helpers/global.helper'

export const ROUNDS_OF_HASHING = 10

@Injectable()
export class AuthService {
  private readonly repository = new PostgresRepository()

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<Auth> {
    const userExists = await this.userService.findByUsername(username)
    if (!userExists) {
      throw new UserNotFoundException()
    }

    const isPasswordValid = await this.passworMatch(password, userExists.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }

    const accessToken = this.jwtService.sign({ userId: userExists.id })

    const user = Helper.pick(userExists, 'username', 'name', 'role') as UserAuth

    return { accessToken, user }
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async login(username: string, password: string): Promise<Auth> {
    return await this.validateUser(username, password)
  }

  async register(username: string, password: string): Promise<User> {
    const userExists = await this.userService.findByUsername(username)
    if (userExists) {
      throw new UserExistsException()
    }

    const hashedPassword = await bcrypt.hash(password, ROUNDS_OF_HASHING)

    const data: UserCreateInput = {
      username,
      password: hashedPassword
    }
    return await this.repository.user.create({ data })
  }
}
