import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Personal Budget Tracker')
  .setDescription('Documentation REST API')
  .setVersion('1.0.0')
  .build();
