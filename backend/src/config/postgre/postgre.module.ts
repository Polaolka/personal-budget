import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { entities } from 'src/models';
import { EnvConfigModule } from '../env/env-config.module';
import { EnvConfigService } from '../env/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule, ConfigModule],
      useFactory: async (envConfig: EnvConfigService) => {
        console.log('Connecting to database:', {
          host: envConfig.getDbHost(),
          port: envConfig.getDbPort(),
          username: envConfig.getDbUsername(),
          database: envConfig.getDbName(),
          password: envConfig.getDbPassword(),
        });

        return {
          type: 'postgres',
          host: envConfig.getDbHost(),
          port: envConfig.getDbPort(),
          username: envConfig.getDbUsername(),
          password: envConfig.getDbPassword(),
          database: envConfig.getDbName(),
          entities: entities,
          migrationsRun: false,
          synchronize: true,
          retryAttempts: 5,
          retryDelay: 3000,
          migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
        };
      },
      inject: [EnvConfigService, ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgreConfigModule {}
