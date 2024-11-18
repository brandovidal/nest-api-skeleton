import { HttpStatus, UnauthorizedException as NestUnauthorizedException } from '@nestjs/common'
import { DateEnhanced } from '../helpers/date.helper'

const UNAUTHORIZED_EXPECTION_MESSAGE = 'Invalid or expired token'
const UNAUTHORIZED_EXPECTION_ERROR = 'Unauthorized'

export class UnauthorizedException extends NestUnauthorizedException {
  constructor(path?: string) {
    super({
      success: false,
      status: HttpStatus.UNAUTHORIZED,
      path,
      message: UNAUTHORIZED_EXPECTION_MESSAGE,
      errors: UNAUTHORIZED_EXPECTION_ERROR,
      timestamp: DateEnhanced.formatIsoString(),
      stack: undefined
    })
  }
}
