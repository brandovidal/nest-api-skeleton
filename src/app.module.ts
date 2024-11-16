import { Module } from '@nestjs/common'

import { UserModule } from './models/user/user.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

// import { ZodValidationPipe } from 'nestjs-zod'
// import { APP_PIPE } from '@nestjs/core'

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ZodValidationPipe,
    // },
  ],
})
export class AppModule {}
