import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'postgres',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'personal_budget',
  synchronize: true,
  logging: true,
  entities: ['src/models/**/*.model{.ts,.js}'],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsRun: false,
});
