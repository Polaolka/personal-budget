import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { EnvConfigService } from '@config/env/env-config.service';
import { AdaptersModule } from '@adapters/adapters.module';
import { CategoryController } from './category/category.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [ServicesModule, LoggerModule, ExceptionsModule, AdaptersModule],
  controllers: [CategoryController, TransactionController],
  providers: [EnvConfigService],
  exports: [],
})
export class ControllersModule {}
