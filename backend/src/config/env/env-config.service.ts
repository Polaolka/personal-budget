import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}
  getFrontendAppUrl(): string {
    return this.configService.get<string>('FRONTEND_APP_URL');
  }

  getDbHost(): string {
    return this.configService.get<string>('DATABASE_HOST') || 'localhost';
  }

  getDbName(): string {
    return this.configService.get<string>('DATABASE_NAME') || 'personal_budget';
  }
  getDbPort(): string {
    return this.configService.get<string>('DATABASE_PORT') || '5432';
  }
  getDbUsername(): string {
    return this.configService.get<string>('DATABASE_USERNAME') || 'postgres';
  }
  getDbPassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') || 'root';
  }
}
