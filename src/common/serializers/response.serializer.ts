import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ZodSerializationException } from 'nestjs-zod'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator'

import dayjs from 'dayjs'

export type Response<T> = {
  success: boolean
  status: number
  path: string
  message: string
  data: T
  timestamp: string
  errors?: any
  stack?: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
    )
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let errors
    if (exception.name === 'ZodValidationException') {
      const zodError = (exception as ZodSerializationException).getZodError()
      errors = zodError.errors
    } else if (exception instanceof HttpException) {
      errors = exception.message
    } else {
      errors = exception
    }

    response.status(status).json({
      success: false,
      status,
      path: request.url,
      message: exception.message,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
      errors: errors,
      stack: exception.stack
    })
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = response.statusCode
    const message = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success'

    return {
      success: true,
      path: request.url,
      message: message,
      status,
      data: res,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
