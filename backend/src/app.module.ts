import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@config/env/env-config.module';

import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { ControllersModule } from '@controllers/controllers.module';

@Module({
  controllers: [],
  providers: [],
  imports: [LoggerModule, ExceptionsModule, ControllersModule, EnvConfigModule],
})
export class AppModule {}
