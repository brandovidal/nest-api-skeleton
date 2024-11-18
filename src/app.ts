import { NestFactory, Reflector } from '@nestjs/core'

import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

import { ResponseInterceptor } from './common/serializers/response.serializer'

import { DOCUMENT_DESCRIPTION, DOCUMENT_TITLE, DOCUMENT_VERSION } from './common/constants/documentation.constant'

export async function App() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)))

  app.useGlobalPipes(new ZodValidationPipe())

  // generate schemas with Zod in Swagger
  patchNestJsSwagger()

  app.enableShutdownHooks()

  const config = new DocumentBuilder()
    .setTitle(DOCUMENT_TITLE)
    .setDescription(DOCUMENT_DESCRIPTION)
    .setVersion(DOCUMENT_VERSION)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  return app
}
