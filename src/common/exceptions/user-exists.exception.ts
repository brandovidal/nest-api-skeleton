import { HttpStatus, BadRequestException as NestBadRequestException } from '@nestjs/common'
import { DateEnhanced } from '../helpers/date.helper'

const USER_EXISTS_EXPECTION_MESSAGE = 'User already exists'
const USER_EXISTS_EXPECTION_ERROR = 'Bad request'

export class UserExistsException extends NestBadRequestException {
  constructor(path?: string) {
    super({
      success: false,
      status: HttpStatus.BAD_REQUEST,
      path,
      message: USER_EXISTS_EXPECTION_MESSAGE,
      errors: USER_EXISTS_EXPECTION_ERROR,
      timestamp: DateEnhanced.formatIsoString(),
      stack: undefined
    })
  }
}
