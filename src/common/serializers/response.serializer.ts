import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ZodSerializationException } from 'nestjs-zod'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator'

import { DateEnhanced } from '../helpers/date.helper'

export type Response<T> = {
  success: boolean
  status: number
  path: string
  message: string
  data: T
  timestamp: string
  errors?: any
  stack?: any
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name)

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err) => throwError(() => this.errorHandler(err, context)))
    )
  }

  errorHandler(exception, context: ExecutionContext) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let errors = exception
    if (exception.name === 'ZodValidationException') {
      const zodError = (exception as ZodSerializationException).getZodError()
      errors = zodError.issues ?? zodError.errors
    } else if (exception.name === 'PrismaClientKnownRequestError') {
      const prismaError = exception as unknown as PrismaClientKnownRequestError
      errors = { code: prismaError.code, message: prismaError.meta }
    } else if (exception instanceof HttpException) {
      errors = exception.message
    } else if (exception instanceof UnauthorizedException) {
      errors = exception.message
    } else {
      this.logger.error(exception.stack)
    }

    const { url: path, method, body, query, params } = request
    const result = {
      success: false,
      status,
      path,
      message: exception.message,
      errors: errors,
      timestamp: DateEnhanced.formatIsoString(),
      stack: process.env.NODE_ENV === 'dev' ? exception.stack : undefined
    }
    this.logger.log({ ...result, method, request: { body, query, params } })

    response.status(status).json(result)
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = response.statusCode
    const message = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success'

    const { url: path, method, body, query, params } = request
    const result = {
      success: true,
      path,
      message: message,
      status,
      data: res,
      timestamp: DateEnhanced.formatIsoString()
    }
    this.logger.log({ ...result, method, request: { body, query, params } })

    return result
  }
}
