import { AdaptersModule } from '@adapters/adapters.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { EnvConfigModule } from '@config/env/env-config.module';
import { Module } from '@nestjs/common';
import { BaseHelper } from '@common/helpers/base.helper';
import { RepositoriesModule } from '@repositories/repositories.module';
import { LoggerModule } from '@common/logger/logger.module';
import { CategoryService } from './category.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    EnvConfigModule,
    ExceptionsModule,
    LoggerModule,
    RepositoriesModule,
    AdaptersModule,
  ],
  providers: [BaseHelper, CategoryService, TransactionService],
  exports: [CategoryService, TransactionService],
})
export class ServicesModule {}
