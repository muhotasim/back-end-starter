import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '..', process.env.NODE_ENV == 'local' ? '.development.env' : '.production.env') })
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
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
  console.info(`server is running at http://localhost:${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
