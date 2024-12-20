import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@config/swagger/swagger.config';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { LoggingInterceptor } from '@common/interceptors/logger.interceptor';
import { LoggerService } from '@common/logger/logger.service';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@common/interceptors/response.interceptor';
import { startServer } from './server';

async function start() {
  const PORT = process.env.PORT || '9990';
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('/api/docs', app, document);

  // CORS
  app.enableCors({});

  // PIPES
  app.useGlobalPipes(new ValidationPipe());

  // INTERCEPTORS
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // BASE ROUTING
  app.setGlobalPrefix('api');

  await startServer(PORT, app);
}

start();
