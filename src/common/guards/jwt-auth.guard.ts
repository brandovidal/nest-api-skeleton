import { ExecutionContext, Injectable } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

import { UnauthorizedException } from '../exceptions/unauthorized.exception'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { url: path } = request

    const token = this.extractTokenFromHeader(request)
    console.log('🚀 ~ JwtAuthGuard ~ canActivate ~ token:', token)
    if (!token) {
      throw new UnauthorizedException(path)
    }

    try {
      const secretKey = process.env.JWT_SECRET_KEY
      console.log('🚀 ~ JwtAuthGuard ~ canActivate ~ secretKey:', secretKey)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException(path)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
