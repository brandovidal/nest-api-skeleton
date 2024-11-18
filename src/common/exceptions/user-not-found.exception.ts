import { HttpStatus, NotFoundException as NestNotFoundException } from '@nestjs/common'
import { DateEnhanced } from '../helpers/date.helper'

const USER_NOT_FOUND_EXPECTION_MESSAGE = 'User not found or invalid'
const USER_NOT_FOUND_EXPECTION_ERROR = 'Not found'

export class UserNotFoundException extends NestNotFoundException {
  constructor(path?: string) {
    super({
      success: false,
      status: HttpStatus.NOT_FOUND,
      path,
      message: USER_NOT_FOUND_EXPECTION_MESSAGE,
      errors: USER_NOT_FOUND_EXPECTION_ERROR,
      timestamp: DateEnhanced.formatIsoString(),
      stack: undefined
    })
  }
}
