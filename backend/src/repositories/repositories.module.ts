import { EnvConfigModule } from '@config/env/env-config.module';
import { PostgreConfigModule } from '@config/postgre/postgre.module';
import { Module } from '@nestjs/common';
import { entities } from '@models/index';
import { LoggerModule } from '@common/logger/logger.module';
import { LoggerService } from '@common/logger/logger.service';
import { BaseHelper } from '@common/helpers/base.helper';
import { CategoryRepository } from './category.repository';
import { Category } from '@models/Category.model';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '@models/Transaction.model';
import { DataSource } from 'typeorm';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EnvConfigModule,
    PostgreConfigModule,
    TypeOrmModule.forFeature(entities),
    LoggerModule,
  ],
  providers: [
    {
      provide: CategoryRepository,
      inject: [getDataSourceToken()],
      useFactory: (dataSource) =>
        new CategoryRepository(
          dataSource.manager,
          Category,
          dataSource,
          new LoggerService(),
          new BaseHelper(new LoggerService()),
        ),
    },
    {
      provide: TransactionRepository,
      inject: [getDataSourceToken()],
      useFactory: (dataSource) =>
        new TransactionRepository(
          dataSource.manager,
          Transaction,
          dataSource,
          new LoggerService(),
          new BaseHelper(new LoggerService()),
        ),
    },
  ],
  exports: [CategoryRepository, TransactionRepository],
})
export class RepositoriesModule {}
