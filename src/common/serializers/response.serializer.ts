import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ZodSerializationException } from 'nestjs-zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

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
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name)

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
      errors = zodError.issues ?? zodError.errors
    } else if (exception.name === 'PrismaClientKnownRequestError') {
      const prismaError = exception as unknown as PrismaClientKnownRequestError
      errors = prismaError?.meta ?? prismaError.code
    } else if (exception instanceof HttpException) {
      errors = exception.message
    } else {
      errors = exception
    }

    const result = {
      success: false,
      status,
      path: request.url,
      message: exception.message,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
      errors: errors
    }
    this.logger.log({ ...result, request: request.body ?? request.query ?? request.params })

    response.status(status).json(result)
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = response.statusCode
    const message = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success'

    const result = {
      success: true,
      path: request.url,
      message: message,
      status,
      data: res,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss')
    }
    this.logger.log({ ...result, request: request.body ?? request.query ?? request.params })
    return result
  }
}
