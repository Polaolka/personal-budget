import { plainToClass } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  FRONTEND_APP_URL: string;

  // DATABASE
  @IsString()
  DATABASE_HOST: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_PORT: string;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
}
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
