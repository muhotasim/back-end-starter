import { config } from 'dotenv';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
config({ path: resolve(__dirname, '..', (process.env.NODE_ENV=='local' || process.env.NODE_ENV == 'development') ? '.development.env' : '.production.env') })
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    preflightContinue: false
  });
  app.use(compression());

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Backend Started Doc')
    .setContact('Muhotasim Fuad', '', 'muhotasimF@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe());
  console.info(`server is running at ${process.env.APP_URL}:${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
