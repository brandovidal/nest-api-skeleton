import { NestFactory, Reflector } from '@nestjs/core'

import { ZodValidationPipe } from 'nestjs-zod'

// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

import { ResponseInterceptor } from './common/serializers/response.serializer'

export async function App() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)))

  app.useGlobalPipes(new ZodValidationPipe())

  // const config = new DocumentBuilder().setTitle('People by Star Wars').setDescription('The Star Wars API people').setVersion('1.0').build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('docs', app, document)

  return app
}
