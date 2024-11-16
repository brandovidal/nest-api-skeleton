import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { Reflector } from '@nestjs/core'

import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator'

import dayjs from 'dayjs'

export type Response<T> = {
  status: boolean
  statusCode: number
  path: string
  message: string
  data: T
  timestamp: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
    )
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      message: exception.message,
      exception: exception,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const statusCode = response.statusCode
    const message = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success'

    return {
      status: true,
      path: request.url,
      message: message,
      statusCode,
      data: res,
      timestamp: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
}
